var IsNodeLike = function (value) {
    return value &&
        (typeof value === 'object') &&
        (typeof value.id === 'string') &&
        (typeof value.category === 'string');
}

export default IsNodeLike;