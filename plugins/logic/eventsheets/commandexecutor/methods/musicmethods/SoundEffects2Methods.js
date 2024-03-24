export default {
    se2(
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
            soundManager.setSoundEffect2Volume(volume);
        }

        if (mute !== undefined) {
            soundManager.setSoundEffect2Mute(mute);
        } else if (unmute !== undefined) {
            soundManager.setSoundEffect2Mute(!unmute);
        }
    },

    'se2.play'(
        {
            key,
            volume, detune, rate, fadeIn = 0,
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

        soundManager.playSoundEffect2(key);

        if (volume !== undefined) {
            soundManager.setSoundEffect2Volume(volume, true);
        }

        if (detune !== undefined) {
            soundManager.setSoundEffect2Detune(detune, true);
        }

        if (rate !== undefined) {
            soundManager.setSoundEffect2Rate(rate, true);
        }

        if (fadeIn > 0) {
            soundManager.fadeInSoundEffect2(fadeIn);
        }

        if (wait) {
            return this.wait({ se: true }, eventSheetManager);
        }
    },

    'se2.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopAllSoundEffects2();
    },

    'se2.fadeOut'(
        {
            duration = 500,
            stop = true,
            wait = false
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutSoundEffect2(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, eventSheetManager);
        }
    },

    'se2.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffect2Mute(true);
    },

    'se2.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffect2Mute(false);
    },
}