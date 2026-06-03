var IsExpressionLike = function (value) {
    return value && (typeof (value.eval) === 'function')
}

export default IsExpressionLike;
