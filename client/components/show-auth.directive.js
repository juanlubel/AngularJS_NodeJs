function ShowAuth(User) {

    return {
        link: (scope, element, attrs) => {
            scope.User = User;

            scope.$watch('User.current', function(val) {
                // If user detected
                if (val) {
                    if (attrs.showAuth === 'true') {
                        element.css({ display: 'inherit'})

                    } else {
                        element.css({ display: 'none'})
                    }

                    // no user detected
                } else {
                    if (attrs.showAuth === 'true') {
                        element.css({ display: 'none'})
                    } else {
                        element.css({ display: 'inherit'})
                    }
                }
            });
        }
    }
}

export default ShowAuth
