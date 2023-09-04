import { UILayerName, MainLayerName, BackgroundLayerName } from './Const.js';

export default {
    addToUILayer(gameObject) {
        this.layerManager.addToLayer(UILayerName, gameObject);
        return this;
    },

    addToMainLayer(gameObject) {
        this.layerManager.addToLayer(MainLayerName, gameObject);
        return this;
    },

    addToBackgroundLayer(gameObject) {
        this.layerManager.addToLayer(BackgroundLayerName, gameObject);
        return this;
    }

}