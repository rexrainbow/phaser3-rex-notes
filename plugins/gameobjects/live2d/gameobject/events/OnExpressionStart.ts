var OnExpressionStart = function(gameObject?: any, name?: any) {
    gameObject.emit(`expression.start-${name}`);
    gameObject.emit('expression.start', name);
}

export default OnExpressionStart;