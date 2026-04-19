import { SetMask } from '../../../../plugins/utils/mask/MaskMethods.js';
import LayerGameObjectClassPatch from '../../../../plugins/utils/monkeypatch/LayerGameObjectClassPatch.js';

export default {
    enableBoardLayer(layer) {
        if (this.layer) {
            return this;
        }

        if ((layer === undefined) || (layer === true)) {
            layer = this.scene.add.layer();
            LayerGameObjectClassPatch(layer);
        }
        this.layer = layer;
        return this;
    },

    resetBoardMask() {
        // Create Graphics game object, mask object
        if (!this.activateAreaMaskGameObject) {
            this.enableBoardLayer();
            this.activateAreaMaskGameObject = this.scene.add.graphics().setVisible(false);
            SetMask(this.layer, this.activateAreaMaskGameObject, undefined, 'world');
        }

        // Draw Graphics game object, a rectangle of activate area
        this.activateAreaMaskGameObject
            .clear()
            .fillStyle(0xffffff)
            .fillRectShape(this.getBoardBounds());


        return this;
    },

}