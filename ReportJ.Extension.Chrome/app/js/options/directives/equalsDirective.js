export default function equalsDirective() {
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
}