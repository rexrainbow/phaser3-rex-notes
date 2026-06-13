import ParameterExpression from '../../eventsheetmanager/nodes/parameterexpression/ParameterExpression.js';

var HasOwnProperty = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

var GetConditionExpression = function (condition, arrayMode) {
    var t = typeof (condition);

    // 1. Missing condition defaults to true.
    if (condition == null) {
        return true;
    }

    // 2. Primitive condition values can be consumed by BT expressions directly.
    if ((t === 'string') || (t === 'number') || (t === 'boolean')) {
        return condition;
    }

    // 3. Array condition keeps legacy meaning: top-level OR, nested AND.
    if (Array.isArray(condition)) {
        // 3a. Empty array has no failed condition, so it defaults to true.
        if (condition.length === 0) {
            return true;
        }

        var expressions = condition.map(function (child) {
            return GetConditionExpression(child, 'and');
        });

        return (arrayMode === 'and') ? { and: expressions } : { or: expressions };
    }

    // 4. Unsupported non-object values fail safely.
    if (t !== 'object') {
        return false;
    }

    // 5. Explicit AND/ALL container has higher priority than command expression.
    if (HasOwnProperty(condition, 'and') || HasOwnProperty(condition, 'all')) {
        var andConditions = condition.and || condition.all || [];
        return {
            and: andConditions.map(function (child) {
                return GetConditionExpression(child);
            })
        };
    }

    // 6. Explicit OR/ANY container has higher priority than command expression.
    if (HasOwnProperty(condition, 'or') || HasOwnProperty(condition, 'any')) {
        var orConditions = condition.or || condition.any || [];
        return {
            or: orConditions.map(function (child) {
                return GetConditionExpression(child);
            })
        };
    }

    // 7. Explicit NOT container has higher priority than command expression.
    if (HasOwnProperty(condition, 'not')) {
        return {
            not: GetConditionExpression(condition.not)
        }
    }

    return new ParameterExpression(condition);
}

export default GetConditionExpression;
