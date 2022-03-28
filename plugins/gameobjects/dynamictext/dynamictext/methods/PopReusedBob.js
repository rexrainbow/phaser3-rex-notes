var PopReusedBob = function (typeName) {
    var bob = this.poolManager.allocate(typeName);
    return bob;
}

export default PopReusedBob;