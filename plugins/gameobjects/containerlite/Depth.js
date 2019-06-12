export default {
    setDepth(value) {
        this.depth = value;
        if (this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth = value;
            }
        }
        return this;
    },

    swapDepth(containerB) {
        var depthA = this.depth;
        var depthB = containerB.depth;
        this.setDepth(depthB);
        containerB.setDepth(depthA);
        return this;
    },

    incDepth(inc) {
        this.depth += inc;
        if (this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth += inc;
            }
        }
        return this;
    },
};