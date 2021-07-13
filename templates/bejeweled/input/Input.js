const GetValue = Phaser.Utils.Objects.GetValue;
class Input {
    constructor(parent, config) {
        this.parent = parent;      // Bejeweled
        this.scene = parent.scene; // Bejeweled.scene

        this.setEnable(GetValue(config, 'input.enable', true));
        this.boot();
    }

    boot() {
        // Touch control
        this.scene.input
            .on('pointerdown', this.selectChess, this)
            .on('pointerup', this.selectChess, this);
    }

    shutdown() {
        this.scene.input
            .off('pointerdown', this.selectChess, this)
            .off('pointerup', this.selectChess, this);
        this.parent = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.enable = enabled;
        return this;
    }

    selectChess(pointer) {
        if (!this.enable) {
            return this;
        }

        if (pointer.isDown) {
            var chess1 = this.parent.worldXYToChess(pointer.worldX, pointer.worldY);
            this.parent.selectChess1(chess1);
        } else { // pointer-up
            var chess1 = this.parent.selectedChess1;
            if (chess1) {
                var chess2 = this.parent.getNeighborChessAtAngle(chess1, pointer.getAngle());
                this.parent.selectChess2(chess2);
            }
        }
    }
}

export default Input;