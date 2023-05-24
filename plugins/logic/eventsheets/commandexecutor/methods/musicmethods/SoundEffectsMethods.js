export default {
    se({ volume = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setSoundEffectVolume(volume);
    },

    'se.play'({ key, volume, fadeIn = 0, wait = false } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.playSoundEffect(key);

        if (volume !== undefined) {
            soundManager.setSoundEffectVolume(volume);
        }
        if (fadeIn > 0) {
            soundManager.fadeInSoundEffect(fadeIn);
        }

        if (wait) {
            return this.wait({ se: true }, manager);
        }
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

    'se.volume'({ value = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setSoundEffectVolume(value);
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