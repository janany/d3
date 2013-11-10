'use strict';

// create module for custom directives
var d3App = angular.module('d3App', []);

// controller business logic
d3App.controller('WorkflowCtrl', function WorkflowCtrl ($scope, $http) {

    $scope.showNodes = function () {
        $('.startFlow').remove();
        $scope.showMenu = true;
    };

    $scope.addNodeElement = function(type){
        $scope.showMenu = false;
    };

    $scope.modifyData = function(){

        window.rerender = true;
        $scope.data = {
            "name" : "A",
            "children" :[
                {"name" : "A1" },
                {"name" : "A2" },
                {"name" : "A3",
                    "children":[
                        {
                            "name" : "A31",
                            "children" :[
                                {"name" : "A314" }, {"name" : "A315" }
                            ]
                        }
                    ]
                }
            ]
        };
    };

    $scope.data =  {
        "name" : "A",
        "children" :[
            {"name" : "A1" },
            {"name" : "A2" },
            {"name" : "A3",
                "children":[
                    {
                        "name" : "A31",
                        "children" :[
                            {"name" : "A311" },{"name" : "A312" },{"name" : "A313" },{"name" : "A314" }, {"name" : "A315" }
                        ]
                    }
                ]
            }
        ]
    };

    /*{
        "name" : "A",
        "children" :[
            {"name" : "A1" },
            {"name" : "A2" },
            {"name" : "A3",
                "children":[
                    {
                        "name" : "A31",
                        "children" :[
                            {"name" : "A311" },
                            {"name" : "A312" }
                        ]
                    }
                ]
            }
        ]
    };*/

    function addNode(){
          console.log("will add a node");
    }
});