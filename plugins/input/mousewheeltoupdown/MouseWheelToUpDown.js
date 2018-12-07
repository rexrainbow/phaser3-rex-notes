import CursorKeys from '../../utils/input/CursorKeys.js';

class MouseWheelToUpDown extends CursorKeys {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.boot();
    }

    boot() {
        var self = this;
        this.onWheeling = function (event) {
            var deltaY = event.deltaY;

            // self.clearAllKeysState();
            self.setKeyState('up', deltaY < 0);
            self.setKeyState('down', deltaY > 0);
        }

        this.scene.sys.canvas.addEventListener('wheel', this.onWheeling, false);
        this.scene.events.on('postupdate', this.clearAllKeysState, this);
        this.scene.events.on('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.sys.canvas.removeEventListener('wheel', this.onWheeling, false);
            this.scene.events.off('postupdate', this.clearAllKeysState, this);
        }
    }

    destroy() {
        this.shutdown();
    }
}

export default MouseWheelToUpDown;