// Only for Managers.js

const RemoveWaitEvents = '_remove.wait';

export default {
    waitEvent(eventEmitter, eventName) {
        eventEmitter.once(eventName, this.complete, this);
        this.once(RemoveWaitEvents, function () {
            eventEmitter.off(eventName, this.complete, this);
        })
        return this;
    },

    removeWaitEvents() {
        this.emit(RemoveWaitEvents);
        return this;
    },

    complete() {
        this.removeWaitEvents();
        this.emit(this.waitCompleteEventName);
        return this;
    },

    waitTime(duration) {
        var timeline = this.timeline
        timeline.delayEvent(duration, 'delay');

        // Clear delay event on timeline manually
        this.once(RemoveWaitEvents, function () {
            timeline.removeDelayEvent('delay');
        });
        return this.waitEvent(timeline, 'delay');
    },

    waitClick() {
        if (!this.clickEE) {
            return this.waitTime(0);
        }

        return this.waitEvent(this.clickEE, 'pointerdown');
    },

    waitKeyDown(key) {
        var eventEmitter = this.scene.input.keyboard;
        if (key) {
            return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
        } else {
            return this.waitEvent(eventEmitter, 'keydown');
        }
    },

    waitGameObjectTweenComplete(goType, name, property) {
        var tweenTask = this.getGameObjectTweenTask(goType, name, property);
        if (tweenTask) {
            return this.waitEvent(tweenTask, 'complete');
        } else {
            return this.waitTime(0);
        }
    },

    waitBackgroundMusicComplete() {
        if (!this.soundManager) {
            return this.waitTime(0);
        }
        var music = this.soundManager.getBackgroundMusic();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitBackgroundMusic2Complete() {
        if (!this.soundManager) {
            return this.waitTime(0);
        }
        var music = this.soundManager.getBackgroundMusic2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitSoundEffectComplete() {
        if (!this.soundManager) {
            return this.waitTime(0);
        }
        var music = this.soundManager.getLastSoundEffect();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitSoundEffect2Complete() {
        if (!this.soundManager) {
            return this.waitTime(0);
        }
        var music = this.soundManager.getLastSoundEffect2();
        if (!music) {
            return this.waitTime(0);
        }
        return this.waitEvent(music, 'complete');
    },

    waitCameraEffectComplete() {
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

        return this.waitEvent(camera, completeEventName);
    },

}