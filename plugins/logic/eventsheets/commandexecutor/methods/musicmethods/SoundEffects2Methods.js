export default {
    'se2.play'({ key, volume, fadeIn = 0, wait = false } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.playSoundEffect2(key);

        if (volume !== undefined) {
            soundManager.setSoundEffect2Volume(volume);
        }
        if (fadeIn > 0) {
            soundManager.fadeInSoundEffect2(fadeIn);
        }

        if (wait) {
            return this.wait({ se: true });
        }
    },

    'se2.fadeOut'({ time = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutSoundEffect2(time, stop);

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'se2.volume'({ value = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setSoundEffect2Volume(value);
    },

    'se2.mute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffect2Mute(true);
    },

    'se2.unmute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setSoundEffect2Mute(false);
    },
}