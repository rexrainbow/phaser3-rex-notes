import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ResizeGameObject from '../../utils/size/ResizeGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FullGameSize extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        gameObject.setScrollFactor(0);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setResizeCallback(
            GetValue(o, 'onResizeCallback', DefaultResizeCallback),
            GetValue(o, 'onResizeCallbackScope', undefined)
        );
    }

    boot() {
        this.scene.scale.on('resize', this.updateSize, this);
        this.updateSize();
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.scale.off('resize', this.updateSize, this);

        this.onResizeCallback = undefined;
        this.onResizeCallbackScope = undefined;

        super.shutdown(fromScene);
    }

    setResizeCallback(callback, scope) {
        this.onResizeCallback = callback;
        this.onResizeCallbackScope = scope;
        return this;
    }

    updateSize() {
        var targetSize = this.scene.scale.gameSize;
        var newWidth = targetSize.width,
            newHeight = targetSize.height;

        // Assume that game objects are displayed on main camera.
        var camera = this.scene.cameras.main;
        var zoomX = camera.zoomX,
            zoomY = camera.zoomY;
        // newWidth /= zoomX;
        // newHeight /= zoomY;

        if ((newWidth === this.prevWidth) && (newHeight === this.prevHeight)) {
            return;
        }

        this.prevWidth = newWidth;
        this.prevHeight = newHeight;

        var callback = this.onResizeCallback,
            scope = this.onResizeCallbackScope;
        var gameObject = this.parent;

        gameObject
            .setPosition(
                (newWidth * gameObject.originX),
                (newHeight * gameObject.originY),
            )

        if (scope) {
            callback.call(scope, newWidth, newHeight, gameObject, this);
        } else {
            callback(newWidth, newHeight, gameObject, this);
        }

        console.log(newWidth, newHeight)
    }

}

var DefaultResizeCallback = function (newWidth, newHeight, gameObject) {
    ResizeGameObject(gameObject, newWidth, newHeight);
}

export default FullGameSize;