export default {
    'bgm.set'(
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
            soundManager.setBackgroundMusicVolume(volume);
        }

        if (mute !== undefined) {
            soundManager.setBackgroundMusicMute(mute);
        } else if (unmute !== undefined) {
            soundManager.setBackgroundMusicMute(!unmute);
        }
    },

    'bgm.play'(
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
            soundManager.setBackgroundMusicLoopValue(loop);
        }

        soundManager.playBackgroundMusic(key);

        if (volume !== undefined) {
            soundManager.setBackgroundMusicVolume(volume);
        }

        if (detune !== undefined) {
            soundManager.setBackgroundMusicDetune(detune);
        }

        if (rate !== undefined) {
            soundManager.setBackgroundMusicRate(rate);
        }

        if (fadeIn > 0) {
            soundManager.fadeInBackgroundMusic(fadeIn);
        }

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }
        return this;
    },

    'bgm.cross'(
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

        soundManager.crossFadeBackgroundMusic(key, duration);

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }
        return this;
    },

    'bgm.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.stopBackgroundMusic();
        return this;
    },

    'bgm.fadeOut'(
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

    'bgm.fadeIn'(
        {
            duration = 500
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.fadeInBackgroundMusic(duration);
        return this;
    },

    'bgm.pause'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.pauseBackgroundMusic();
        return this;
    },

    'bgm.resume'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.resumeBackgroundMusic();
        return this;
    },

    'bgm.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setBackgroundMusicMute(true);
        return this;
    },

    'bgm.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setBackgroundMusicMute(false);
        return this;
    },
}