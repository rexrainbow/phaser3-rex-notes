import GetLocalState from './utils/GetLocalState.js';

var GetRendererLayer = function () {
    // This containerLite has rendererLayer
    if (this.rendererLayer) {
        return this.rendererLayer;
    }

    // One of parent is layerRendererEnable
    var parent = this.getParent();
    while (parent) {
        if (parent.rendererLayer) {
            return parent.rendererLayer;
        }

        parent = parent.getParent();
    }

    return null;
}

export default {
    hasLayer() {
        return this.layerRendererEnable;
    },

    enableLayer() {
        this.enableLayerRenderer();
        return this;
    },

    // Backward compatible
    getLayer() {
        this.enableLayerRenderer();
        return this;
    },

    // Override Base.addChildCallback
    addChildCallback(gameObject) {
        /* Base.addChildCallback:
        var layer = this.rendererLayer;
        if (layer) {
            layer.add(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
        */

        // Don't add to layer if gameObject is not in any displayList
        if (!gameObject.displayList) {
            return;
        }

        // Move gameObject from scene to layer (rendererLayer)
        var layer = GetRendererLayer.call(this);
        if (!layer) {
            return;
        }

        if (layer === gameObject.displayList) {
            return;
        }

        if (gameObject.isRexContainerLite) {
            // Add containerLite and its children
            gameObject.addToLayer(layer);
        } else {
            // Add gameObject directly
            layer.add(gameObject);
        }

        var state = GetLocalState(gameObject);
        state.layer = layer;
    },

    // Override Base.removeChildCallback
    removeChildCallback(gameObject, destroyChild) {
        /* Base.removeChildCallback:
        var layer = this.rendererLayer;
        if (layer) {
            layer.remove(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
        */

        // Move gameObject from layer to scene
        var state = GetLocalState(gameObject);
        var layer = state.layer;
        if (!layer) {
            return;
        }

        if (gameObject.isRexContainerLite) {
            // Remove containerLite and its children
            gameObject.removeFromLayer(true);
        } else {
            // Remove gameObject directly
            layer.remove(gameObject);
        }

        state.layer = null;
    },
}
