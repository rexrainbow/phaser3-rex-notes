var IsExpressionLike = function (value) {
    return value &&
        (typeof (value._eval) === 'function');
}

export default IsExpressionLike;
