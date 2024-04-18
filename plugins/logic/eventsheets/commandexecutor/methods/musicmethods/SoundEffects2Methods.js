export default {
    'se2.set'(
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
            soundManager.setSoundEffect2Volume(volume);
        }

        if (mute !== undefined) {
            soundManager.setSoundEffect2Mute(mute);
        } else if (unmute !== undefined) {
            soundManager.setSoundEffect2Mute(!unmute);
        }
        return this;
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
            return this;
        }
        if (!key) {
            return this;
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
            this.wait({ se: true }, eventSheetManager);
        }
        return this;
    },

    'se2.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.stopAllSoundEffects2();
        return this;
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
            return this;
        }
        soundManager.fadeOutSoundEffect2(duration, stop);

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }
        return this;
    },

    'se2.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setSoundEffect2Mute(true);
        return this;
    },

    'se2.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setSoundEffect2Mute(false);
        return this;
    },
}