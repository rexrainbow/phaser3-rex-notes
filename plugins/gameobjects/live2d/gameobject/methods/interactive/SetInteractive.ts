import HitAreaCallback from './HitAreaCallback';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GameObject = PhaserGameObjects.GameObject;

var SetInteractive = function(hitArea?: any, hitAreaCallback?: any, dropZone?: any) {
    var isInit = !this.input;

    if (IsPlainObject(hitArea)) {
        hitArea.hitArea = HitAreaCallback;
        hitArea.hitAreaCallback = HitAreaCallback;
    } else {
        hitArea = HitAreaCallback;
        hitAreaCallback = HitAreaCallback;
    }

    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

    if (isInit?: any) {
        this
            .on('pointerdown', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                FireEvent(this, 'pointerdown', pointer, localX, localY, event);
            })
            .on('pointerup', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                FireEvent(this, 'pointerup', pointer, localX, localY, event);
            })
            .on('pointermove', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                FireEvent(this, 'pointermove', pointer, localX, localY, event);
                FireOutEvent(this, pointer, event);
                FireOverEvent(this, pointer, localX, localY, event);
            })
            .on('pointerout', function(pointer?: any, event?: any) {
                FireOutEvent(this, pointer, event);
            })
    }

    return this;
}

var FireEvent = function(gameObject?: any, eventPrefix?: any, pointer?: any, localX?: any, localY?: any, event?: any) {
    var hitTestResult = gameObject.hitTestResult;
    for (var name in hitTestResult) {
        if (hitTestResult[name]) {
            gameObject.emit(`${eventPrefix}-${name}`, pointer, localX, localY, event);
        }
    }
}

var FireOutEvent = function(gameObject?: any, pointer?: any, event?: any) {
    var prevHitTestResult = gameObject.prevHitTestResult;
    var hitTestResult = gameObject.hitTestResult;
    for (var name in hitTestResult) {
        if (prevHitTestResult[name] && !hitTestResult[name]) {
            gameObject.emit(`pointerout-${name}`, pointer, event);
        }
    }
}

var FireOverEvent = function(gameObject?: any, pointer?: any, localX?: any, localY?: any, event?: any) {
    var prevHitTestResult = gameObject.prevHitTestResult;
    var hitTestResult = gameObject.hitTestResult;
    for (var name in hitTestResult) {
        if (!prevHitTestResult[name] && hitTestResult[name]) {
            gameObject.emit(`pointerover-${name}`, pointer, localX, localY, event);
        }
    }
}

export default SetInteractive;