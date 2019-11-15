const GetValue = Phaser.Utils.Objects.GetValue;
class Input {
    constructor(parent, config) {
        this.parent = parent; // Bejeweled
        this.scene = parent.scene; // Bejeweled.scene
        this.board = parent.board; // Bejeweled.board
        this.mainState = parent.mainState; // Bejeweled.mainState

        this.defaultInput = !!GetValue(config, 'input', true);
        this.setEnable(GetValue(config, 'input.enable', true));
        if (this.defaultInput) {
            this.boot();
        }
    }

    boot() {
        // Touch control
        this.scene.input
            .on('pointerdown', this.selectChess, this)
            .on('pointerup', this.selectChess, this);
    }

    shutdown() {
        if (this.defaultInput) {
            this.scene.input
                .off('pointerdown', this.selectChess, this)
                .off('pointerup', this.selectChess, this);
        }
        this.parent = undefined;
        this.scene = undefined;
        this.board = undefined;
        this.mainState = undefined;
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
            var chess1 = this.board.worldXYToChess(pointer.worldX, pointer.worldY);
            this.mainState.selectChess1(chess1);
        } else { // pointer-up
            var chess1 = this.mainState.selectedChess1;
            if (chess1) {
                var chess2 = this.board.getNeighborChessAtAngle(chess1, pointer.getAngle());
                this.mainState.selectChess2(chess2);
            }
        }
    }
}

export default Input;