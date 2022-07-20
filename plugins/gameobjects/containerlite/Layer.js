export default {
    enableLayer() {
        if (this.layer) {
            return this;
        }

        var layer = this.scene.add.layer();

        this.moveDepthBelow(layer);

        this.once('destroy', function () {
            layer.removeAll().destroy();
        })

        this.addToLayer(layer);

        this.layer = layer;

        return this;
    },

    getLayer() {
        if (!this.layer) {
            this.enableLayer();
        }

        return this.layer;
    },

    getRenderLayer() {
        // This containerLite has a layer
        if (this.layer) {
            return this.layer;
        }

        // One of parent container has a layer
        var parent = this.getParent();
        while (parent) {
            var layer = parent.layer;
            if (layer) {
                return layer;
            }
            parent = parent.getParent();
        }

        return null;
    }
}