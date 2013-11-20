
d3App.directive('ghVisualization', function () {

        plotNodes = function (group) {
            group.append("svg:path")
                .attr("d", function(d){
                    switch(d.type){
                        case 'dataInput':
                            return "M 0,-20 L 30,-20 L 50,0 L 30,20 L 0,20 L 20,0 z";
                            break;

                        case 'execution':
                            return "M 0,-7 A 22 22 0 1 1 0 0";

                            break;

                        case 'trigger':
                            return "M 0,-20 L 0,20  L 40,0 z";
                            break;
                    }
                })
                .attr('fill', "#1D80C0")
                .attr('stroke', "#888888")
                .attr('stroke-width', 1)

            group.append("svg:text")
                .attr("dx", function(d) {
                    return d.children ? -8 : 8;
                })
                .attr("dy", 3)
                .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
                .text(function(d) { return d.name; });
        };

    return {
        restrict: 'E',
        terminal: true,
        scope: {
            val: '='
        },

        link: function (scope, element, attrs) {
            //Added debounce to make sure this function is not repeatedly called for all the nodes of the svg
            var fixSVGDimension = _.debounce(function(){
                scope.svgContainer.attr('transform', '');
                var rect = $('svg g')[0].getBoundingClientRect();
                $('svg').width(rect.width-rect.left)
                    .height(rect.height+20);

                var _left = rect.left+35;   //35 buffer to accomodate the text
                var _top = Math.abs(rect.top)+10;
                scope.svgContainer.attr("transform", "translate(" + _left + "," + _top + ")");

            }, 50);

            // set up initial svg object
            scope.svgContainer = d3.select('.treeContainer')
                .append("svg:svg")
                .append("svg:g")

            scope.$watch('val', function (newVal, oldVal) {
                var reDraw = false;
                if(scope.tree){
                    reDraw = true;
                }
                scope.render(newVal, oldVal, reDraw)
            });


            scope.render =  function(newVal, oldVal, reDraw){
                if(!newVal){
                    return;
                }
                if(! scope.tree){
                    scope.tree = d3.layout.tree()
                        .nodeSize([100,100])
                        /*.size([500,350])*/
                }
               /* else{
                    scope.tree.nodeSize([70,70])
                }*/

                // Preparing the data for the tree layout, convert data into an array of nodes and create an array with all the links
                var nodes = scope.tree.nodes(newVal),
                    links = scope.tree.links(nodes),
                    link = scope.svgContainer.selectAll("path.link").data(links), node, g, elbow;

                elbow = function elbow(d, i) {
                    return "M" + d.source.y + "," + d.source.x
                        + "H" + d.target.y + "V" + d.target.x ;
                    //+ (d.target.children ? "" : "h" + margin.right);
                }

                // Enter
                link.enter().insert("path","g")
                    .attr("class", "link")
                    .attr("d", elbow);

                if(reDraw){
                    link.transition()
                        .duration(400)
                        .attr("d", elbow)
                }
                // Exit
                link.exit()
                    .transition()
                    .duration(400)
                    .attr("d", elbow)
                    .remove();

                node = scope.svgContainer.selectAll("g")
                    .data(nodes, function(d) { return d.name;})

                // Enter
                g = node.enter().append("g")
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node");
                plotNodes(g);

                if(reDraw){
                    node.transition()
                        .each("end", fixSVGDimension)
                        .duration(400)
                        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
                } else {
                    fixSVGDimension();
                }
                // Exit
                node.exit()
                    .transition()
                    .each("end", fixSVGDimension)
                    .duration(400)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .remove();
            }
        }
    }
});