import angular from "angular";

export default function diableValidation() {
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
}