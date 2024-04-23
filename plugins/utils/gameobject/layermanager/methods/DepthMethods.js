import DisplayListMethods from '../../displaylist/DisplayListMethods.js';

export default {

    bringLayerToTop(layerName) {
        var layer = this.getLayer(layerName);
        if(!layer) {
            return this;
        }

        DisplayListMethods.bringMeToTop.call(layer);

        return this;
    },

    sendLayerToBack(layerName) {
        var layer = this.getLayer(layerName);
        if(!layer) {
            return this;
        }

        DisplayListMethods.sendMeToBack.call(layer);

        return this;
    },

    moveLayerBelow(layerName, baseLayerName) {
        if (layerName === baseLayerName) {
            return this;
        }

        var layer = this.getLayer(layerName);
        var baseLayer = this.getLayer(baseLayerName);
        if (!layer || !baseLayer) {
            return this;
        }

        DisplayListMethods.moveMyDepthBelow.call(layer, baseLayer);

        return this;
    },

    moveLayerAbove(layerName, baseLayerName) {
        if (layerName === baseLayerName) {
            return this;
        }

        var layer = this.getLayer(layerName);
        var baseLayer = this.getLayer(baseLayerName);
        if (!layer || !baseLayer) {
            return this;
        }

        DisplayListMethods.moveMyDepthAbove.call(layer, baseLayer);

        return this;
    },

}