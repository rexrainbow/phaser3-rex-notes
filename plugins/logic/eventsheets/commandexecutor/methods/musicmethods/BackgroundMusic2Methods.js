export default {
    'bgm2.set'(
        {
            volume, mute, unmute
        } = {},
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        if (volume !== undefined) {
            soundManager.setBackgroundMusic2Volume(volume);
        }

        if (mute !== undefined) {
            soundManager.setBackgroundMusic2Mute(mute);
        } else if (unmute !== undefined) {
            soundManager.setBackgroundMusic2Mute(!unmute);
        }
        return this;
    },

    'bgm2.play'(
        {
            key,
            volume, detune, rate, fadeIn = 0, loop,
            wait = false
        } = {},
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        if (!key) {
            return this;
        }

        if (loop !== undefined) {
            soundManager.setBackgroundMusic2LoopValue(loop);
        }

        soundManager.playBackgroundMusic2(key);

        if (volume !== undefined) {
            soundManager.setBackgroundMusic2Volume(volume);
        }

        if (detune !== undefined) {
            soundManager.setBackgroundMusic2Detune(detune);
        }

        if (rate !== undefined) {
            soundManager.setBackgroundMusic2Rate(rate);
        }

        if (fadeIn > 0) {
            soundManager.fadeInBackgroundMusic2(fadeIn);
        }

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }

        return this;
    },

    'bgm2.cross'(
        {
            key,
            duration = 500,
            wait = false
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        if (!key) {
            return this;
        }

        soundManager.crossFadeBackgroundMusic2(key, duration);

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }

        return this;
    },

    'bgm2.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.stopBackgroundMusic2();
        return this;
    },

    'bgm2.fadeOut'(
        {
            duration = 500, stop = true,
            wait = false
        },
        eventSheetManager
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.fadeOutBackgroundMusic2(duration, stop);

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }
        return this;
    },

    'bgm2.fadeIn'(
        {
            duration = 500
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.fadeInBackgroundMusic2(duration);
        return this;
    },

    'bgm2.pause'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.pauseBackgroundMusic2();
        return this;
    },

    'bgm2.resume'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.resumeBackgroundMusic2();
        return this;
    },

    'bgm2.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setBackgroundMusic2Mute(true);
        return this;
    },

    'bgm2.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setBackgroundMusic2Mute(false);
        return this;
    },
}