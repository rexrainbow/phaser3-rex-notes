export default {
    'se.set'(
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
            soundManager.setSoundEffectVolume(volume);
        }

        if (mute !== undefined) {
            soundManager.setSoundEffectMute(mute);
        } else if (unmute !== undefined) {
            soundManager.setSoundEffectMute(!unmute);
        }
        return this;
    },

    'se.play'(
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

        soundManager.playSoundEffect(key);

        if (volume !== undefined) {
            soundManager.setSoundEffectVolume(volume, true);
        }

        if (detune !== undefined) {
            soundManager.setSoundEffectDetune(detune, true);
        }

        if (rate !== undefined) {
            soundManager.setSoundEffectRate(rate, true);
        }

        if (fadeIn > 0) {
            soundManager.fadeInSoundEffect(fadeIn);
        }

        if (wait) {
            this.wait({ se: true }, eventSheetManager);
        }
        return this;
    },

    'se.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.stopAllSoundEffects();
        return this;
    },

    'se.fadeOut'(
        {
            duration = 500, stop = true,
            wait = false
        },
        eventSheetManager, eventsheet
    ) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }
        soundManager.fadeOutSoundEffect(duration, stop);

        if (wait) {
            this.wait({ bgm: true }, eventSheetManager);
        }
        return this;
    },

    'se.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setSoundEffectMute(true);
        return this;
    },

    'se.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return this;
        }

        soundManager.setSoundEffectMute(false);
        return this;
    },
}