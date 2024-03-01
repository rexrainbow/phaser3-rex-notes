import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import { GetBounds } from '../../utils/bounds/GetBounds.js';

const Rectangle = Phaser.Geom.Rectangle;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bounds extends TickTask {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        config.tickEventName = 'postupdate';
        super(gameObject, config);
        // this.parent = gameObject;

        this.bounds = new Rectangle();
        this.boundsTarget = undefined;
        this.boundsEnable = {};
        this.boundsHitMode = {};
        this.clearHitResult();
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var target = GetValue(o, 'target');
        if (target) {
            this.setBoundsTarget(target);
        } else {
            this.setBoundsTarget();
            this.setBounds(GetValue(o, 'bounds'));
        }

        this.setEnable(GetValue(o, 'enable', true));

        this.setBoundsHitMode(GetValue(o, 'boundsHitMode'));


        this.setAlignMode(GetValue(o, 'alignMode', (!this.hasWrapBoundHitMode) ? 0 : 1));

        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
    }

    setBoundsTarget(gameObject) {
        this.boundsTarget = gameObject;
        return this;
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

    setEnable(enable) {
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

    setBoundsHitMode(mode) {
        if (mode === undefined) {
            mode = 0;
        }
        var boundsHitMode = this.boundsHitMode;
        boundsHitMode.left = GetBoundHitMode(GetValue(mode, 'left', mode));
        boundsHitMode.right = GetBoundHitMode(GetValue(mode, 'right', mode));
        boundsHitMode.top = GetBoundHitMode(GetValue(mode, 'top', mode));
        boundsHitMode.bottom = GetBoundHitMode(GetValue(mode, 'bottom', mode));

        this.hasWrapBoundHitMode = (boundsHitMode.left + boundsHitMode.right + boundsHitMode.top + boundsHitMode.bottom) > 0;

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
        this.setEnable(value);
    }

    update(time, delta) {
        var gameObject = this.parent;
        this.clearHitResult();
        if (!this.enable) {
            return this;
        }

        var target = this.boundsTarget;
        if (target) {
            GetBounds(target, this.bounds);
        }

        var bounds = this.bounds;
        var boundsEnable = this.boundsEnable;
        var boundsHitMode = this.boundsHitMode;

        var gameObjectLeftBound, gameObjectRightBound, gameObjectTopBound, gameObjectBottomBound;

        if (this.alignMode === 0) {
            var gameObjectBounds = GetBounds(gameObject, true);
            gameObjectLeftBound = gameObjectBounds.left;
            gameObjectRightBound = gameObjectBounds.right;
            gameObjectTopBound = gameObjectBounds.top;
            gameObjectBottomBound = gameObjectBounds.bottom;
        } else {
            gameObjectLeftBound = gameObject.x;
            gameObjectRightBound = gameObject.x;
            gameObjectTopBound = gameObject.y;
            gameObjectBottomBound = gameObject.y;
        }

        if (boundsEnable.left) {
            var dx = bounds.left - gameObjectLeftBound;
            if (dx > 0) {
                this.isHitAny = true;
                this.isHitLeft = true;

                if (boundsHitMode.left === 0) {
                    gameObject.x += dx;
                } else {
                    gameObject.x = bounds.right - dx;
                }

                this.emit('hitleft', this.parent, this);
            }
        }

        if (boundsEnable.right) {
            var dx = bounds.right - gameObjectRightBound;
            if (dx < 0) {
                this.isHitAny = true;
                this.isHitRight = true;

                if (boundsHitMode.left === 0) {
                    gameObject.x += dx;
                } else {
                    gameObject.x = bounds.left - dx;
                }

                this.emit('hitright', this.parent, this);
            }
        }

        if (boundsEnable.top) {
            var dy = bounds.top - gameObjectTopBound;
            if (dy > 0) {
                this.isHitAny = true;
                this.isHitTop = true;

                if (boundsHitMode.left === 0) {
                    gameObject.y += dy;
                } else {
                    gameObject.y = bounds.bottom - dy;
                }

                this.emit('hittop', this.parent, this);
            }
        }

        if (boundsEnable.bottom) {
            var dy = bounds.bottom - gameObjectBottomBound;
            if (dy < 0) {
                this.isHitAny = true;
                this.isHitBottom = true;

                if (boundsHitMode.left === 0) {
                    gameObject.y += dy;
                } else {
                    gameObject.y = bounds.top - dy;
                }

                this.emit('hitbottom', this.parent, this);
            }
        }

        if (this.isHitAny) {
            this.emit('hitany', this.parent, this);
        }
    }

    clearHitResult() {
        this.isHitAny = false;
        this.isHitLeft = false;
        this.isHitRight = false;
        this.isHitTop = false;
        this.isHitBottom = false;
        return this;
    }
}

const BoundHitMode = {
    clamp: 0,
    wrap: 1
}

const AlignMode = {
    bounds: 0,
    origin: 1
}

var GetBoundHitMode = function (mode) {
    if (typeof (mode) === 'string') {
        mode = BoundHitMode[mode];
    }
    return mode;
}

export default Bounds;