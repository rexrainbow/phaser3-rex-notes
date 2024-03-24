export default {
    bgm(
        {
            volume, mute, unmute
        } = {},
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
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
            return;
        }
        if (!key) {
            return;
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
            return this.wait({ bgm: true }, eventSheetManager);
        }
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
            return;
        }
        if (!key) {
            return;
        }

        soundManager.crossFadeBackgroundMusic(key, duration);

        if (wait) {
            return this.wait({ bgm: true }, eventSheetManager);
        }
    },

    'bgm.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopBackgroundMusic();
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
            return;
        }
        soundManager.fadeOutBackgroundMusic2(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, eventSheetManager);
        }
    },

    'bgm.fadeIn'(
        {
            duration = 500
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeInBackgroundMusic(duration);
    },

    'bgm.pause'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.pauseBackgroundMusic();
    },

    'bgm.resume'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.resumeBackgroundMusic();
    },

    'bgm.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusicMute(true);
    },

    'bgm.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusicMute(false);
    },
}