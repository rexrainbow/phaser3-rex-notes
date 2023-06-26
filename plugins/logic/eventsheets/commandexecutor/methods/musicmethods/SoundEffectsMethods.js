export default {
    se({ volume, mute, unmute } = {}, manager) {
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

    'se.play'({ key, volume, detune, rate, fadeIn = 0, wait = false } = {}, manager) {
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
            return this.wait({ se: true }, manager);
        }
    },

    'se.stop'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopAllSoundEffects();
    },

    'se.fadeOut'({ duration = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutSoundEffect(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'se.mute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffectMute(true);
    },

    'se.unmute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffectMute(false);
    },
}