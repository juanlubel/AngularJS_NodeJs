function ShowAuth(User) {

    return {
        link: (scope, element, attrs) => {
            console.log(element, attrs)
            scope.User = User
            console.log('directive on')
            scope.$watch('User.current', (val) => {
                console.log(val)
            })
        }
    }
}

export default ShowAuth
