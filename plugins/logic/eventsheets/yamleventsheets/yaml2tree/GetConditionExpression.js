var GetConditionExpression = function (conditions) {
    var t = typeof (conditions);

    if (conditions == null) {
        return 'true';
    } else if ((t === 'string') || (t === 'number')) {
        return conditions;
    } else if (!Array.isArray(conditions) || !conditions.length) {
        return 'true'
    };

    // conditions is an array
    var condition;
    for (var i = 0, cnt = conditions.length; i < cnt; i++) {
        condition = conditions[i];
        if (typeof (condition) === 'string') {
            // Do nothing
        } else if (Array.isArray(condition)) {
            conditions[i] = `(${condition.join(') && (')})`
        } else if (condition.and) {
            conditions[i] = `(${condition.and.join(') && (')})`
        } else {
            conditions[i] = '(false)';
        }
    }
    condition = `(${conditions.join(') || (')})`;

    return condition;
}

export default GetConditionExpression;