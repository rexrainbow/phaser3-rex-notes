import DisplayListMethods from '../../displaylist/DisplayListMethods';

export default {

    bringLayerToTop(layerName?: any) {
        var layer = this.getLayer(layerName);
        if(!layer) {
            return this;
        }

        DisplayListMethods.bringMeToTop.call(layer);

        return this;
    },

    sendLayerToBack(layerName?: any) {
        var layer = this.getLayer(layerName);
        if(!layer) {
            return this;
        }

        DisplayListMethods.sendMeToBack.call(layer);

        return this;
    },

    moveLayerBelow(layerName?: any, baseLayerName?: any) {
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

    moveLayerAbove(layerName?: any, baseLayerName?: any) {
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