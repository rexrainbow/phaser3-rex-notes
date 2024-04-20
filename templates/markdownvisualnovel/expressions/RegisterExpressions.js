import RegisterRandomExpression from './RegisterRandomExpression.js';
import RegisterRandomIntExpression from './RegisterRandomIntExpression.js';

var RegisterHandlers = [
    RegisterRandomExpression,
    RegisterRandomIntExpression,
]

var RegisterExpressions = function (eventSheetManager) {
    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](eventSheetManager);
    }
}

export default RegisterExpressions;