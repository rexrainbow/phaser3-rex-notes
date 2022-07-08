import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import { GetBounds } from '../../utils/bounds/GetBounds.js';

const Rectangle = Phaser.Geom.Rectangle;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bounds extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.bounds = new Rectangle();
        this.boundsEnable = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setBounds(GetValue(o, 'bounds'));
        this.setBoundsEnable(GetValue(o, 'enable', true));
        this.setAlignMode(GetValue(o, 'alignMode', 0));

        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
    }

    setBounds(boundsConfig) {
        if (!boundsConfig) {
            return this;
        }

        var bounds = this.bounds;

        bounds.setSize(
            GetValue(boundsConfig, 'width', 0),
            GetValue(boundsConfig, 'height', 0)
        )
        if (boundsConfig.hasOwnProperty('centerX')) {
            bounds.centerX = boundsConfig.centerX;
        } else {
            bounds.x = GetValue(boundsConfig, 'x', 0);
        }
        if (boundsConfig.hasOwnProperty('centerY')) {
            bounds.centerY = boundsConfig.centerY;
        } else {
            bounds.y = GetValue(boundsConfig, 'y', 0);
        }

        return this;
    }

    setBoundsEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        var boundsEnable = this.boundsEnable;
        if (typeof (enable) === 'boolean') {
            boundsEnable.left = enable;
            boundsEnable.right = enable;
            boundsEnable.top = enable;
            boundsEnable.bottom = enable;
        } else {
            boundsEnable.left = GetValue(enable, 'left', false);
            boundsEnable.right = GetValue(enable, 'right', false);
            boundsEnable.top = GetValue(enable, 'top', false);
            boundsEnable.bottom = GetValue(enable, 'bottom', false);
        }

        this.isRunning = this.enable;

        return this;
    }

    setAlignMode(mode) {
        if (typeof (mode) === 'string') {
            mode = AlignMode[mode];
        }
        this.alignMode = mode;
        return this;
    }

    get enable() {
        var boundsEnable = this.boundsEnable;
        return boundsEnable.left || boundsEnable.right || boundsEnable.top || boundsEnable.bottom;
    }

    set enable(value) {
        this.setBoundsEnable(value);
    }

    update(time, delta) {
        var gameObject = this.parent;
        if (!this.enable) {
            return this;
        }

        var boundsEnable = this.boundsEnable;
        var bounds = this.bounds;

        var alignToGOBound = (this.alignMode === 0);
        var gameObjectBounds = (alignToGOBound) ? GetBounds(gameObject, true) : undefined;

        if (boundsEnable.left) {
            var left = (alignToGOBound) ? gameObjectBounds.left : gameObject.x;
            var dx = bounds.left - left;
            if (dx > 0) {
                gameObject.x += dx;
            }
        }
        if (boundsEnable.right) {
            var right = (alignToGOBound) ? gameObjectBounds.right : gameObject.x;
            var dx = bounds.right - right;
            if (dx < 0) {
                gameObject.x += dx;
            }
        }
        if (boundsEnable.top) {
            var top = (alignToGOBound) ? gameObjectBounds.top : gameObject.y;
            var dy = bounds.top - top;
            if (dy > 0) {
                gameObject.y += dy;
            }
        }
        if (boundsEnable.bottom) {
            var bottom = (alignToGOBound) ? gameObjectBounds.bottom : gameObject.y;
            var dy = bounds.bottom - bottom;
            if (dy < 0) {
                gameObject.y += dy;
            }
        }


    }
}

const AlignMode = {
    bounds: 0,
    origin: 1
}

export default Bounds;