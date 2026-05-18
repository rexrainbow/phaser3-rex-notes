import ReshapeArray1DTo2D from '../../../utils/array/ReshapeArray1DTo2D';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const ArrayAdd = PhaserUtils.Array.Add;
const ArrayAddAt = PhaserUtils.Array.AddAt;
const ArrayRemove = PhaserUtils.Array.Remove;
const Clamp = PhaserMath.Clamp;

export default {
    setTargets(gameObjects?: any, columns?: any) {
        if (gameObjects && (columns !== undefined)) {
            gameObjects = ReshapeArray1DTo2D(gameObjects, columns);
        }

        this.targets = gameObjects;
        this.focus(this.focusedTarget);
        return this;
    },

    getTargetIndex(gameObject?: any, out?: any) {
        if (out == undefined) {
            out = { x: undefined, y: undefined };
        }

        var targets = this.targets;
        var is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));

        if (is1DTargetsArray?: any) {
            var x = targets.indexOf(gameObject);
            if (x !== -1) {
                out.x = x;
                out.y = 0;
            }
        } else {
            for (var y = 0, rowCount = targets.length; y < rowCount; y++) {
                var row = targets[y];
                var x = row.indexOf(gameObject);
                if (x !== -1) {
                    out.x = x;
                    out.y = y;
                    break;
                }
            }
        }
        return out;
    },

    addTarget(gameObject?: any) {
        var targets = this.targets || [];
        var is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));
        var row = (is1DTargetsArray) ? targets : targets[targets.length - 1];

        ArrayAdd(row, gameObject);
        this.setTargets(targets);

        return this;
    },

    insertTarget(gameObject?: any, x?: any, y?: any) {
        var targets = this.targets || [];
        var is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));

        if (is1DTargetsArray?: any) {
            ArrayAddAt(targets, gameObject, x);
        } else {
            if (y === undefined) {
                if (!Array.isArray(gameObject)) {
                    gameObject = [gameObject];
                }
                x = Clamp(x, 0, targets.length - 1);
                targets.splice(x, 0, gameObject);
            } else {
                y = Clamp(y, 0, targets.length - 1);
                ArrayAddAt(targets[y], gameObject, x);
            }
        }

        this.setTargets(targets);
        return this;
    },

    removeTarget(gameObject?: any) {
        var targets = this.targets || [];
        var is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));

        if (is1DTargetsArray?: any) {
            ArrayRemove(targets, gameObject);
        } else {
            for (var y = 0, cnt = targets.length; y < cnt; y++) {
                ArrayRemove(targets[y], gameObject);
            }
        }

        this.setTargets(this.targets);
        return this;
    },


}