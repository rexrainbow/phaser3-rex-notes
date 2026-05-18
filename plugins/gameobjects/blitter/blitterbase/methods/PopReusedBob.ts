var PopReusedBob = function(typeName?: any) {
    var bob = (this.poolManager) ? this.poolManager.allocate(typeName) : null;
    return bob;
}

export default PopReusedBob;