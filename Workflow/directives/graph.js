
d3App.directive('ghVisualization', function () {

    var colorMap = {
            "dataInput": "red",
            "execution": "blue",
            "trigger": "yellow"
        },
        plotCircle = function (group) {
            group.append("svg:circle")
                .attr("r", 3.5)
                .style("fill", function(d){
                      return colorMap[d.type];
                });
           /* group.append('svg:polygon')
                .attr("fill", "white")
                .attr('stroke', "blue")
                .attr('stroke-width', 2)
                .attr('points',"0,-20 30,-20 50,0 30,20 0,20 20,0")*/

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
            // set up initial svg object
            scope.svgContainer = d3.select('.treeContainer')
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 300)
                //.attr("viewBox", "0 0 " + 400+ " " + 300)
                //.attr("preserveAspectRatio", "xMidYMid meet")
                //.style("overflow", "auto")
                .append("svg:g")
                .attr("transform", "translate(40, 0)")


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
                        .size([300,150])  //nodeSize([50,50])
                }

                // Preparing the data for the tree layout, convert data into an array of nodes and create an array with all the links
                var nodes = scope.tree.nodes(newVal),
                    links = scope.tree.links(nodes),
                    link = scope.svgContainer.selectAll("path").data(links), node, g, elbow;

                elbow = function elbow(d, i) {
                    return "M" + d.source.y + "," + d.source.x
                        + "H" + d.target.y + "V" + d.target.x ;
                    //+ (d.target.children ? "" : "h" + margin.right);
                }

                // Enter
                link.enter().insert("path","g")
                    .attr("class", "link")
                    .attr("d", elbow);

                if(reDraw){  //TODO 1
                    link.transition()
                        .duration(400)
                        //.attr("transform", "translate(1,1)rotate(0)")
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
                    .attr("class", "node")
                plotCircle(g);

                if(reDraw){  //TODO 2
                    node.transition()
                        .duration(400)
                        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                }

                // Exit
                node.exit()
                    .transition()
                    .duration(400)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .remove();
            }
                //var _width = $('svg g')[0].getBoundingClientRect().width;
                //var _height = $('svg g')[0].getBoundingClientRect().height;
        }
    }
});
