import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import CursorAtBounds from '../../cursoratbounds.js';
import MouseWheelToUpDown from '../../mousewheeltoupdown.js';
import GetCameraByName from '../../utils/camera/GetCameraByName.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BoundsWheelController extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.cursorAtBounds = new CursorAtBounds(scene);
        this.mouseWheel = new MouseWheelToUpDown(scene);

        var boundsCursorKeys = this.cursorAtBounds.createCursorKeys();
        var mouseWheelCursorKeys = this.mouseWheel.createCursorKeys();

        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            left: boundsCursorKeys.left,
            right: boundsCursorKeys.right,
            up: boundsCursorKeys.up,
            down: boundsCursorKeys.down,
            zoomIn: mouseWheelCursorKeys.down,
            zoomOut: mouseWheelCursorKeys.up,

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3,
            zoomSpeed: 0.05
        });

        var camera = GetCameraByName(scene, GetValue(config, 'camera'));

        this
            .setCamera(camera)
            .setBoundsScrollEnable(GetValue(config, 'boundsScrollEnable', true))
            .setMouseWheelZoomEnable(GetValue(config, 'mouseWheelZoomEnable', true))

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
        this.mouseWheel.destroy();
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

    get boundsScrollEnable() {
        return this.cursorAtBounds.enable;
    }

    set boundsScrollEnable(value) {
        this.cursorAtBounds.enable = value;
    }

    setBoundsScrollEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.boundsScrollEnable = enable;
        return this;
    }

    get mouseWheelZoomEnable() {
        return this.mouseWheel.enable;
    }

    set mouseWheelZoomEnable(value) {
        this.mouseWheel.enable = value;
    }

    setMouseWheelZoomEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.mouseWheelZoomEnable = enable;
        return this;
    }

    updateCameraController(time, delta) {
        this.cameraController.update(delta);
    }
}

export default BoundsWheelController;