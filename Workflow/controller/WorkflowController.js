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
        $scope.data = {
            "name" : "A",
            "type": "trigger",
            "children" :[
                {"name" : "A1",  "type": "dataInput"},
                {"name" : "A2",  "type": "dataInput" },
                {"name" : "A3",
                    "type": "trigger",
                    "children":[
                        {
                            "name" : "A31",
                            "type": "trigger",
                            "children" :[
                                {"name" : "A311", "type": "execution" },{"name" : "A312", "type": "execution" },{"name" : "A313", "type": "execution"},{"name" : "A314", "type": "execution" }, {"name" : "A315", "type": "execution" }
                                //,{"name" : "A3111", "type": "execution" },{"name" : "A3121", "type": "execution" },{"name" : "A3131", "type": "execution"},{"name" : "A3141", "type": "execution" }, {"name" : "A3151", "type": "execution" }
                                //,{"name" : "A3112", "type": "execution" },{"name" : "A3122", "type": "execution" },{"name" : "A3133", "type": "execution"},{"name" : "A3144", "type": "execution" }, {"name" : "A3155", "type": "execution" }
                            ]
                        }
                    ]
                },
                {"name" : "A4",  "type": "dataInput" },
                {"name" : "A5",  "type": "dataInput" }
            ]
        };
        /*$scope.data =  window.addData;*/
    };
    $scope.deleteData = function(){
        $scope.data =  {
            "name" : "A",
            "type": "trigger",
            "children" :[

                {"name" : "A2",  "type": "dataInput" },
                {"name" : "A3",
                    "type": "trigger",
                    "children":[
                        {
                            "name" : "A31",
                            "type": "trigger",
                            "children" :[
                                {"name" : "A311", "type": "execution" },{"name" : "A312", "type": "execution" },{"name" : "A313", "type": "execution"},{"name" : "A314", "type": "execution" }, {"name" : "A315", "type": "execution" }
                            ]
                        }
                    ]
                }
            ]
        };
        /*$scope.data =  window.removeData;*/
    };

    $scope.data =  {
        "name" : "A",
        "type": "trigger",
        "children" :[
            {"name" : "A1",  "type": "dataInput"},
            {"name" : "A2",  "type": "dataInput" },
            {"name" : "A3",
                "type": "trigger",
                "children":[
                    {
                        "name" : "A31",
                        "type": "trigger",
                        "children" :[
                            {"name" : "A311", "type": "execution" },{"name" : "A312", "type": "execution" },{"name" : "A313", "type": "execution"},{"name" : "A314", "type": "execution" }, {"name" : "A315", "type": "execution" }
                        ]
                    }
                ]
            }
        ]
    };

});
