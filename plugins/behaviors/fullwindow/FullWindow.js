import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetFirstRenderCamera from '../../utils/camera/GetFirstRenderCamera.js';

class FullWindow extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;

        this.targetCamera = undefined;
        this.boot();
    }

    boot() {
        this.scene.sys.events.on('prerender', this.resize, this);
    }

    destroy() {
        if (!this.scene) {
            return;
        }

        this.scene.sys.events.off('prerender', this.resize, this);

        super.destroy();
    }


    resize() {
        var scene = this.scene;
        var gameObject = this.parent;

        var camera = GetFirstRenderCamera(gameObject);
        if (!camera) {
            return;
        }

        gameObject
            .setScrollFactor(0)
            .setOrigin(0.5);

        var gameSize = scene.sys.scale.gameSize;
        var gameWidth = gameSize.width,
            gameHeight = gameSize.height,
            scale = 1 / camera.zoom;

        // Origin is fixed to (0.5,0.5)
        var x = gameWidth / 2,
            y = gameHeight / 2;

        var width = gameWidth * scale,
            height = gameHeight * scale;

        if ((gameObject.x !== x) || (gameObject.y !== y)) {
            gameObject.setPosition(x, y);
        }

        if ((gameObject.width !== width) || (gameObject.height !== height)) {
            gameObject.setSize(width, height);
        }

    }


}

export default FullWindow;