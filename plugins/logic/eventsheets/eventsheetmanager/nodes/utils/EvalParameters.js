var EvalParameters = function (tick, parameters) {
    var evaledParameters = {};
    for (var name in parameters) {
        evaledParameters[name] = tick.evalExpression(parameters[name]);
    }

    return evaledParameters;
}

export default EvalParameters;