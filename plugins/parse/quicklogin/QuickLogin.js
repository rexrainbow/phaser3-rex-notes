import Parse from 'parse/dist/parse.min.js';

var QuickLogin = function (userName, password) {
    return Parse.User.logOut() // // Log-out first
        .then(function () {
            return Parse.User.logIn(userName, password); // Try login
        })
        .then(
            function () {  // Login success 
                return Promise.resolve();
            },
            function () {  // Login fail
                // Try sign-up, then login again
                var user = new Parse.User();
                user
                    .set('username', userName)
                    .set('password', password);

                return user.signUp()
                    .then(function () {  // Sign up success, try login again                        
                        return Parse.User.logIn(userName, password);
                    })
            }
        )
}

export default QuickLogin;