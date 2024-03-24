export default {
    se(
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
            soundManager.setSoundEffectVolume(volume);
        }

        if (mute !== undefined) {
            soundManager.setSoundEffectMute(mute);
        } else if (unmute !== undefined) {
            soundManager.setSoundEffectMute(!unmute);
        }
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
            return;
        }
        if (!key) {
            return;
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
            return this.wait({ se: true }, eventSheetManager);
        }
    },

    'se.stop'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopAllSoundEffects();
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
            return;
        }
        soundManager.fadeOutSoundEffect(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, eventSheetManager);
        }
    },

    'se.mute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffectMute(true);
    },

    'se.unmute'(config, eventSheetManager, eventsheet) {

        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffectMute(false);
    },
}