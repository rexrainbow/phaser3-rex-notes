import { BGLayer, GOLayer, UILayer, } from './Layers';

export default {
    getBackgroundCamera() {
        return this.layerManager.getCamera(BGLayer);
    },

    getMonitorCamera() {
        return this.layerManager.getCamera(GOLayer);
    },

    getUICamera() {
        return this.layerManager.getCamera(UILayer);
    }
}