export default {
    enableBoardLayer(layer) {
        if (this.layer) {
            return this;
        }

        if ((layer === undefined) || (layer === true)) {
            layer = this.scene.add.layer();
        }
        this.layer = layer;
        return this;
    },

    resetBoardMask() {
        // Create Graphics game object, mask object
        if (!this.activateAreaMaskGameObject) {
            this.activateAreaMaskGameObject = this.scene.make.graphics().setVisible(false);
            this.activateAreaMask = this.activateAreaMaskGameObject.createGeometryMask();
            this.enableBoardLayer();
            this.layer.setMask(this.activateAreaMask);
        }

        // Draw Graphics game object, a rectangle of activate area
        this.activateAreaMaskGameObject
            .clear()
            .fillStyle(0xffffff)
            .fillRectShape(this.getBoardBounds());

        return this;
    },

}