import CursorKeys from '../../utils/input/CursorKeys.js';

class MouseWheelToUpDown extends CursorKeys {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.boot();
    }

    boot() {
        this.scene.input.on('wheel', this.onWheeling, this);
        this.scene.events.on('postupdate', this.clearAllKeysState, this);
        this.scene.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('wheel', this.onWheeling, this);
            this.scene.events.off('postupdate', this.clearAllKeysState, this);
        }
    }

    destroy() {
        this.shutdown();
    }

    onWheeling(pointer, currentlyOver, dx, dy, dz, event) {
        this.setKeyState('up', dy < 0);
        this.setKeyState('down', dy > 0);
    }
}

export default MouseWheelToUpDown;