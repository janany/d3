
d3App.directive('ghVisualization', function () {
    // constants
    var margin = 20,
        width = 960,
        height = 500 - .5 - margin,
        plotCircle = function (group) {
            group.append("svg:circle")
                .attr("r", 3.5);

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
                .append("svg:g")
                .attr("transform", "translate(40, 0)");

            scope.$watch('val', function (newVal, oldVal) {
                if(scope.tree){
                    scope.reDraw(newVal);
                } else {
                    scope.render(newVal, oldVal);
                }
            });

            scope.reDraw =  function(newVal){
                // Preparing the data for the tree layout, convert data into an array of nodes
                var nodes = scope.tree.nodes(newVal),
                    links = scope.tree.links(nodes),
                    link = scope.svgContainer.selectAll("path").data(links), node, g;

                link.enter().insert("path","g")
                    .attr("transform", "translate(1,1)rotate(0)")
                    .attr("class", "link")
                    .attr("d", scope.elbow)

                link.transition()
                    .duration(400)
                    .attr("transform", "translate(1,1)rotate(0)")
                    .attr("d", scope.elbow)

                link.exit()
                    .transition()
                    .duration(1000)
                    .attr("d", scope.elbow)
                    .remove();

                node = scope.svgContainer.selectAll("g")
                    .data(nodes, function(d) { return d.name;})
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node")

                g = node.enter().append("g")

                plotCircle(g);


                node.transition()
                    .duration(200)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node")

                node.exit()
                    .transition()
                    .duration(1000)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .remove();



                // place the name atribute left or right depending if children

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

                var link = scope.svgContainer.selectAll("path")
                    .data(links)

                // Enter
                link.enter().append("path")
                    .attr("class", "link")
                    .attr("d", scope.elbow);
                // Exit
                link.exit().remove();


                var node = scope.svgContainer.selectAll("g")
                    .data(nodes, function(d) { return d.name;})

                // Enter
                node.enter().append("g")
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                    .attr("class", "node")
                // Exit
                node.exit().remove();

                plotCircle(node);
            }
        }
    }
});
