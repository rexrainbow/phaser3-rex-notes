import * as Const from './Const.js';

var SetExpression = function (expressionName) {
    if (expressionName === undefined) {
        expressionName = 0;
    }

    var motion;
    var expressionNameType = typeof (expressionName);
    if (expressionNameType === 'string') {
        motion = this._expressions.getValue(expressionName);
    } else if (expressionNameType === 'number') {
        var keyValue = this._expressions._keyValues[expressionName];
        motion = (keyValue) ? keyValue.second : null;
        expressionName = (keyValue) ? keyValue.first : undefined;
    }

    if (!motion) {
        // Error
        return this;
    }

    this._expressionManager.startMotionPriority(
        motion,
        false,
        Const.PriorityForce
    );
    this._currentExpressionName = expressionName;

    return this;
}

export default SetExpression;