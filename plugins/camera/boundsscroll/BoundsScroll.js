import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import CursorAtBounds from '../../cursoratbounds.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BoundsScroll extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.cursorAtBounds = new CursorAtBounds(scene);

        var boundsCursorKeys = this.cursorAtBounds.createCursorKeys();

        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            left: boundsCursorKeys.left,
            right: boundsCursorKeys.right,
            up: boundsCursorKeys.up,
            down: boundsCursorKeys.down,

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3,
        });

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setCamera(camera)
            .setEnable(GetValue(config, 'enable', true))

        this.boot();
    }

    boot() {
        this.scene.events.on('preupdate', this.updateCameraController, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.events.off('preupdate', this.updateCameraController, this);

        this.cursorAtBounds.destroy();
        this.cameraController.destroy();

        super.shutdown(fromScene);
    }

    get camera() {
        return this.cameraController.camera;
    }

    set camera(value) {
        this.cameraController.setCamera(value);

        if (value) {
            this.cameraController.start();
        } else {
            this.cameraController.stop();
        }
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    get enable() {
        return this.cursorAtBounds.enable;
    }

    set enable(value) {
        this.cursorAtBounds.enable = value;
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    updateCameraController(time, delta) {
        this.cameraController.update(delta);
    }
}

export default BoundsScroll;