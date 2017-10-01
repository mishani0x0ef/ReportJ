import angular from "angular";

const reportjApp = angular.module("reportjApp", [])
    .constant("browser", chrome);

reportjApp.directive('equals', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) {
                console.warn("No ng-model was defined for equal directive.")
                return;
            }

            scope.$watch(attrs.ngModel, function () {
                validate();
            });

            attrs.$observe('equals', function () {
                validate();
            });

            var validate = function () {
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;
                var equals = !val1 || !val2 || val1 === val2;

                ngModel.$setValidity('equals', equals);
            };
        }
    }
});

reportjApp.directive('diableValidation', function () {
    return {
        require: '^form',
        restrict: 'A',
        link: function (scope, element, attrs, form) {
            var control;

            scope.$watch(function () {
                return scope.$eval(attrs.diableValidation);
            }, function (value) {
                if (!control) {
                    control = form[element.find("input").attr("name")];
                }
                if (value === false) {
                    form.$addControl(control);
                    angular.forEach(control.$error, function (validity, validationToken) {
                        form.$setValidity(validationToken, !validity, control);
                    });
                } else {
                    form.$removeControl(control);
                }
            });
        }
    }
});

export default reportjApp;