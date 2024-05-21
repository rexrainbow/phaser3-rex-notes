export default {
    setScrollFactor(name, scrollFactorX, scrollFactorY) {
        if (scrollFactorY === undefined) {
            scrollFactorY = scrollFactorX;
        }

        var layer = this.getLayer(name);
        if (!layer) {
            return this;
        }
        layer.scrollFactorX = scrollFactorX;
        layer.scrollFactorY = scrollFactorY;
        var children = layer.getAll();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setScrollFactor(scrollFactorX, scrollFactorY);
        }

        return this;
    }
}