import Snapshot from '../../../utils/rendertexture/Snapshot.js';

export default {
    snapshot(config) {
        if (config === undefined) {
            config = {};
        }

        config.gameObjects = this.getAllVisibleChildren();
        config.x = this.x;
        config.y = this.y;
        config.originX = this.originX;
        config.originY = this.originY;
        var rt = Snapshot(config);

        var saveTextureOnlyMode = config.saveTexture && !config.renderTexture;
        return (saveTextureOnlyMode) ? this : rt;
    }
}