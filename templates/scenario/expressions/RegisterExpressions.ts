import RegisterRandomExpression from './RegisterRandomExpression';
import RegisterRandomIntExpression from './RegisterRandomIntExpression';

var RegisterHandlers = [
    RegisterRandomExpression,
    RegisterRandomIntExpression,
]

var RegisterExpressions = function(eventSheetManager?: any, config?: any) {
    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](eventSheetManager);
    }
}

export default RegisterExpressions;