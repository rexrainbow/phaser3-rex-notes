var IsExpressionLike = function (value) {
    return value &&
        (typeof (value.eval) === 'function') &&
        (typeof (value.setParent) === 'function');
}

export default IsExpressionLike;
