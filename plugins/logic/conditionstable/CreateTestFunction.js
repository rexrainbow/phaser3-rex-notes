var CreateTestFunction = function (keys, equations) {
    var conditions = [];
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        if ((equations[i] === '') || (equations[i] == null)) {
            continue;
        }
        conditions.push(
            CreateComparisonLogic(keys[i], equations[i])
        );
    }

    var logic = (conditions.length > 0) ? conditions.join('&&') : 'false';
    var f = new Function('values', 'return ' + logic);
    return f;
};

var isEquation = function (s) {
    return (s.indexOf('==') != -1) ||
        (s.indexOf('!=') != -1) ||
        (s.indexOf('>=') != -1) ||
        (s.indexOf('<=') != -1) ||
        (s.indexOf('>') != -1) ||
        (s.indexOf('<') != -1);
};
var CreateComparisonLogic = function (key, equation) {
    if (!isEquation(equation)) {
        if (isNaN(equation)) {
            equation = '\'' + equation + '\'';
        }

        equation = '==(' + equation + ')';
    }
    return '(values[\'' + key + '\']' + equation + ')';
};

export default CreateTestFunction;