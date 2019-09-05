import GetSceneObject from '../../utils/system/GetSceneObject.js';
import IsObjectBelowPointer from '../../utils/input/IsObjectBelowPointer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

class Drag {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setAxisRotation(GetValue(o, "rotation", 0));
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            axis: this.axisMode,
            rotation: this.axisRotation
        };
    }

    boot() {
        var gameObject = this.gameObject;
        gameObject.on('dragstart', this.onDragStart, this);
        gameObject.on('drag', this.onDrag, this);
        gameObject.on('dragend', this.onDragEnd, this);
        gameObject.once('destroy', this.destroy, this);
    }

    shutdown() {
        this.pointer = undefined;
        this.gameObject = undefined;
        this.scene = undefined;
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        if (this.enable === e) {
            return this;
        }

        if (!e) {
            this.pointer = undefined;
        }
        this.enable = e;
        this.scene.input.setDraggable(this.gameObject, e);
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = DIRECTIONNODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setAxisRotation(a) {
        this.axisRotation = a;
        return this;
    }

    drag() {
        var inputPlugin = this.scene.input;
        var inputManager = inputPlugin.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (
                (!pointer.primaryDown) ||
                (inputPlugin.getDragState(pointer) !== 0) ||
                (!IsObjectBelowPointer(this.gameObject, pointer))
            ) {
                continue;
            }

            // For 3.18.0
            inputPlugin.setDragState(pointer, 1);
            inputPlugin._drag[pointer.id] = [this.gameObject];
            if ((inputPlugin.dragDistanceThreshold === 0) || (inputPlugin.dragTimeThreshold === 0)) {
                //  No drag criteria, so snap immediately to mode 3
                inputPlugin.setDragState(pointer, 3);
                inputPlugin.processDragStartList(pointer);
            } else {
                //  Check the distance / time on the next event
                inputPlugin.setDragState(pointer, 2);
            }
            break;
            // For 3.18.0
        }
    }

    dragend() {
        if (!this.isDragging) {
            return;
        }
        this.pointer.dragState = 5;
        return this;
    }

    onDragStart(pointer, dragX, dragY) {
        if (this.isDragging) {
            return;
        }
        this.pointer = pointer;
    }

    onDrag(pointer, dragX, dragY) {
        if (this.pointer !== pointer) {
            return;
        }
        var gameObject = this.gameObject;
        if (this.axisMode === 0) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameObject.x = dragX;
            } else if (this.axisMode === 2) {
                gameObject.y = dragY;
            }
        } else {
            var dist;
            P1.x = dragX;
            P1.y = dragY;

            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, -this.axisRotation, dist);

            if (this.axisMode === 1) {
                P1.y = gameObject.y;
            } else if (this.axisMode === 2) {
                P1.x = gameObject.x;
            }
            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, this.axisRotation, dist);

            gameObject.x = P1.x;
            gameObject.y = P1.y;
        }

    }

    onDragEnd(pointer, dragX, dragY, dropped) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
    }

    get isDragging() {
        return (this.pointer !== undefined);
    }
}

var P1 = {}; // reuse this point object

/** @private */
const DIRECTIONNODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
};


export default Drag;