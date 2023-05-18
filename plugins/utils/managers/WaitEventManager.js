import GetValue from '../object/GetValue.js';
import PreUpdateDelayCall from '../time/PreUpdateDelayCall.js';

const RemoveWaitEvents = '_remove.wait';

class WaitEventManager {
    constructor(parent, config) {
        this.parent = parent;

        this.waitCompleteEventName = GetValue(config, 'completeEventName', 'complete');
        this.clickEE = GetValue(config, 'clickTarget', parent.scene.input);
        this.targetCamera = GetValue(config, 'camera', parent.scene.cameras.main);

    }

    waitEvent(eventEmitter, eventName, completeNextTick) {
        if (completeNextTick === undefined) {
            completeNextTick = true;
        }

        var callback = (completeNextTick) ? this.completeNextTick : this.complete;

        eventEmitter.once(eventName, callback, this);
        this.parent.once(RemoveWaitEvents, function () {
            eventEmitter.off(eventName, callback, this);
        })

        return this.parent;
    }

    removeWaitEvents() {
        this.parent.emit(RemoveWaitEvents);
        return this;
    }

    complete() {
        this.removeWaitEvents();
        this.parent.emit(this.waitCompleteEventName);
        return this;
    }

    completeNextTick() {
        // Emit complete event at scene's preupdate event of next tick
        PreUpdateDelayCall(this.parent, 0, this.complete, this);
        return this;
    }

    waitTime(duration) {
        var timeline = this.parent.timeline
        timeline.delayEvent(duration, 'delay');

        // Clear delay event on timeline manually
        this.parent.once(RemoveWaitEvents, function () {
            timeline.removeDelayEvent('delay');
        });
        return this.waitEvent(timeline, 'delay', false);
    }

    waitClick() {
        if (!this.clickEE) {
            return this.waitTime(0);
        }

        return this.waitEvent(this.clickEE, 'pointerdown');
    }

    waitKeyDown(key) {
        var eventEmitter = this.parent.scene.input.keyboard;
        if (typeof (key) === 'string') {
            return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    }

    waitGameObjectTweenComplete(goType, name, property) {
        var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
        if (tweenTask) {
            return this.waitEvent(tweenTask, 'complete', false);
        } else {
            return this.waitTime(0);
        }
    }

    waitBackgroundMusicComplete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getBackgroundMusic();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete', false);
    }

    waitBackgroundMusic2Complete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getBackgroundMusic2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete', false);
    }

    waitSoundEffectComplete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getLastSoundEffect();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete', false);
    }

    waitSoundEffect2Complete() {
        if (!this.parent.soundManager) {
            return this.waitTime(0);
        }
        var music = this.parent.soundManager.getLastSoundEffect2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete', false);
    }

    waitCameraEffectComplete(effectName) {
        var camera = this.targetCamera;
        if (!camera) {
            return this.waitTime(0);
        }

        var effect, completeEventName;
        switch (effectName) {
            case 'camera.fadein':
                effect = camera.fadeEffect;
                completeEventName = 'camerafadeincomplete';
                break;

            case 'camera.fadeout':
                effect = camera.fadeEffect;
                completeEventName = 'camerafadeoutcomplete';
                break;

            case 'camera.flash':
                effect = camera.flashEffect;
                completeEventName = 'cameraflashcomplete';
                break;

            case 'camera.shake':
                effect = camera.shakeEffect;
                completeEventName = 'camerashakecomplete';
                break;

            case 'camera.zoom':
                effect = camera.zoomEffect;
                completeEventName = 'camerazoomcomplete';
                break;

            case 'camera.rotate':
                effect = camera.rotateToEffect;
                completeEventName = 'camerarotatecomplete';
                break;

            case 'camera.scroll':
                effect = camera.panEffect;
                completeEventName = 'camerapancomplete';
                break;
        }

        if (!effect.isRunning) {
            return this.waitTime(0);
        }

        return this.waitEvent(camera, completeEventName, false);
    }

    waitAny(config) {
        if (!config) {
            return this.waitTime(0);
        }

        var hasAnyWaitEvent = false;
        for (var name in config) {
            switch (name) {
                case 'time':
                    hasAnyWaitEvent = true;
                    this.waitTime(config.time);
                    break;

                case 'click':
                    hasAnyWaitEvent = true;
                    this.waitClick(config.key);
                    break;


                case 'key':
                    hasAnyWaitEvent = true;
                    this.waitKeyDown(config.key);
                    break;

                case 'camera':
                    hasAnyWaitEvent = true;
                    this.waitCameraEffectComplete(config.camera);
                    break;

                case 'bgm':
                    hasAnyWaitEvent = true;
                    this.waitBackgroundMusicComplete();
                    break;

                case 'bgm2':
                    hasAnyWaitEvent = true;
                    this.waitBackgroundMusic2Complete();
                    break;

                case 'se':
                    hasAnyWaitEvent = true;
                    this.waitSoundEffectComplete();
                    break;

                case 'se2':
                    hasAnyWaitEvent = true;
                    this.waitSoundEffect2Complete();
                    break;

                default:
                    var names = name.split('.');
                    if (names.length === 2) {
                        hasAnyWaitEvent = true;
                        this.waitGameObjectTweenComplete(undefined, names[0], names[1]);
                    }
                    break;

            }
        }

        if (!hasAnyWaitEvent) {
            this.waitTime(0);
        }

        return this.parent;
    }
}

export default WaitEventManager;