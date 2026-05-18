import IsLayerGameObject from '../../../utils/system/IsLayerGameObject';
import IsContainerGameObject from '../../../utils/system/IsContainerGameObject';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig';

export default {
    addToContainer(container?: any) {
        if (!container) {
            return this;
        }

        this.forEachGameObject(function(gameObject?: any) {
            container.add(gameObject);
        })

        return this;
    },

    addToLayer(layer?: any) {
        this.addToContainer(layer);
        return this;
    },

    fitContainer(container?: any, padding?: any) {
        if (!container) {
            return this;
        }

        this.addToContainer(container);

        // p3Container, Layer, rexContainerLite

        if (IsLayerGameObject(container)) {
            return this;
        }

        var padding = GetBoundsConfig(padding);
        var bounds = this.getBounds();

        var width = bounds.width + padding.left + padding.right;
        var height = bounds.height + padding.top + padding.bottom;
        container.setSize(width, height);

        var offsetX = -(width * container.originX) + padding.left;
        var offsetY = -(height * container.originY) + padding.top;


        if (IsContainerGameObject(container)) {
            // Is built-in container
            this.setGraphOffset(offsetX, offsetY);

        } else if (container.isRexContainerLite) {
            // Is rex-containerlite
            this.setGraphOffset(offsetX, offsetY);

            this.forEachGameObject(function(gameObject?: any) {
                container.setChildLocalPosition(gameObject, gameObject.x, gameObject.y);
            })
        }

        return this;
    },

}