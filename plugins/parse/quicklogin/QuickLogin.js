import Parse from 'parse/dist/parse.min.js';

var QuickLogin = function (userName, password) {
    return new Promise(function (resolve, reject) {
        // Log-out first
        Parse.User.logOut()
            .then(function () {
                // Try login
                return Parse.User.logIn(userName, password)
            })
            .then(
                resolve, // Login success            
                function () { // Login fail
                    // Try sign-up, then login again
                    var user = new Parse.User();
                    user
                        .set('username', userName)
                        .set('password', password)
                        .signUp()
                        .then(function () {
                            // Sign up success, try login again
                            return Parse.User.logIn(userName, password);
                        })
                        .then(resolve)
                        .catch(reject);
                }
            );
    });
}

export default QuickLogin;