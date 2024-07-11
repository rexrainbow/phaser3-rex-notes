import CursorKeys from '../../utils/input/CursorKeys.js';

const KeyNames = ['a', 'b', 'x', 'y', 'l1', 'l2', 'r1', 'r2'];

class GamepadKeys extends CursorKeys {
    constructor(scene) {
        super(scene);
        // this.scene = scene;

        this.addKeys(KeyNames);
        this.pad = null;
    }

    shutdown(fromScene) {
        super.shutdown(fromScene);
    }

    setGamepad(pad) {
        this.pad = pad;
        return this;
    }

    get aKeyDown() {
        return this.keys.a.isDown;
    }

    get bKeyDown() {
        return this.keys.b.isDown;
    }

    get xKeyDown() {
        return this.keys.x.isDown;
    }

    get yKeyDown() {
        return this.keys.y.isDown;
    }

    get l1KeyDown() {
        return this.keys.l1.isDown;
    }

    get l2KeyDown() {
        return this.keys.l2.isDown;
    }

    get r1KeyDown() {
        return this.keys.r1.isDown;
    }

    get r2KeyDown() {
        return this.keys.r2.isDown;
    }
}

export default GamepadKeys;