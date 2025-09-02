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
        var board = this.board;
        var grid = board.grid;

        var worldTL = board.tileXYToWorldXY(0, board.height / 2);
        var x = worldTL.x - (grid.width / 2);
        var y = worldTL.y - (grid.height / 2);
        var width = this.activateBoardWidth * grid.width;
        var height = this.activateBoardHeight * grid.height;
        this.activateAreaMaskGameObject.fillRect(x, y, width, height);

        return this;
    },

}