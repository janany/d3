
d3App.directive('ghVisualization', function () {
    // constants
    var margin = 20,
        width = 960,
        height = 500 - .5 - margin,
        color = d3.interpolateRgb("#f77", "#77f");

    return {
        restrict: 'E',
        terminal: true,
        scope: {
            val: '='
        },

        link: function (scope, element, attrs) {
               debugger;
            // set up initial svg object

            scope.svgContainer = d3.select('.treeContainer')
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 300)
                .append("svg:g")
                .attr("transform", "translate(40, 0)");

            scope.$watch('val', function (newVal, oldVal) {
            //TODO   remove the window scope later, just addded for testing . Should modify this later
                if(window.rerender){
                    scope.reDraw(newVal);
                    window.rerender = false;
                }
                else{
                    scope.render(newVal, oldVal);
                }
            });

            scope.reDraw =  function(newVal){
                // Preparing the data for the tree layout, convert data into an array of nodes
                var nodes = scope.tree.nodes(newVal);
                // Create an array with all the links
                var links = scope.tree.links(nodes);

                //scope.svgContainer.selectAll(".link").remove();
                var link = scope.svgContainer.selectAll("pathlink")
                    .data(links, function(d){return d})
                    //.enter().append("svg:path")// TODO  this code is needed
                    .attr("class", "link")
                    .attr("d", scope.elbow)


                var node = scope.svgContainer.selectAll("g.node")
                    .data(nodes)
                    //.enter().append("svg:g")// TODO this code is needed
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node")

                node.append("svg:circle")
                    .attr("r", 3.5);

                // place the name atribute left or right depending if children
                node.append("svg:text")
                    .attr("dx", function(d) { return d.children ? -8 : 8; })
                    .attr("dy", 3)
                    .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
                    .text(function(d) { return d.name; })
            };

            scope.render =  function(newVal, oldVal){
                if(!newVal){
                    return;
                }

                scope.tree = d3.layout.tree()
                    .size([300,150]);

                // Preparing the data for the tree layout, convert data into an array of nodes
                var nodes = scope.tree.nodes(newVal);
                // Create an array with all the links
                var links = scope.tree.links(nodes);

                scope.elbow = function elbow(d, i) {
                    return "M" + d.source.y + "," + d.source.x
                        + "H" + d.target.y + "V" + d.target.x ;
                    //+ (d.target.children ? "" : "h" + margin.right);
                }

                var link = scope.svgContainer.selectAll("pathlink")
                    .data(links)

                // Enter…
                link.enter().append("svg:path")
                    .attr("class", "link")
                    .attr("d", scope.elbow);
                // Exit…
                link.exit().remove();


                var node = scope.svgContainer.selectAll("g.node")
                    .data(nodes)

                // Enter…
                node.enter().append("svg:g")
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node")
                // Exit…
                node.exit().remove();


                // Add the dot at every node
                node.append("svg:circle")
                    .attr("r", 3.5);

                // place the name atribute left or right depending if children
                node.append("svg:text")
                    .attr("dx", function(d) { return d.children ? -8 : 8; })
                    .attr("dy", 3)
                    .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
                    .text(function(d) { return d.name; })
            }
        }
    }
});