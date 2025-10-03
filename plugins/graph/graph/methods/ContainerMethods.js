import IsLayerGameObject from '../../../utils/system/IsLayerGameObject.js';
import IsContainerGameObject from '../../../utils/system/IsContainerGameObject.js';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig.js';

export default {
    setGameObjectContainer(container) {
        this.container = container;  // p3Container, Layer, rexContainerLite
        return this;
    },

    addToContainer(container) {
        if (container) {
            this.container = container;
        }

        var container = this.container;
        if (!container) {
            return this;
        }

        this.forEachGameObject(function (gameObject) {
            container.add(gameObject);
        })

        return this;
    },

    setContainerPadding(padding) {
        this.containerPadding = padding;
        return this;
    },

    fitContainer(padding) {
        var container = this.container;
        if (!container) {
            return this;
        }

        // p3Container, Layer, rexContainerLite

        if (IsLayerGameObject(container)) {
            return this;
        }

        if (padding !== undefined) {
            this.setContainerPadding(padding);
        }

        var padding = GetBoundsConfig(this.containerPadding);
        var bounds = this.getBounds();

        var width = bounds.width + padding.left + padding.right;
        var height = bounds.height + padding.top + padding.bottom;
        container.setSize(width, height);

        var offsetX = -(width * container.originX) + padding.left;
        var offsetY = -(height * container.originY) + padding.top;

        if (IsContainerGameObject(container)) {
            this.setGraphOffset(offsetX, offsetY);

        } else if (container.isRexContainerLite) {
            this.setGraphOffset(offsetX, offsetY);

            this.forEachGameObject(function (gameObject) {
                container.setChildLocalPosition(gameObject, gameObject.x, gameObject.y);
            })
        }

        return this;
    },

}