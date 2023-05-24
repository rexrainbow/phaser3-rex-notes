export default {
    bgm({ volume = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setBackgroundMusicVolume(volume);
    },

    'bgm.play'({ key, loop, volume, fadeIn = 0, wait = false } = {}, manager) {
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
        if (fadeIn > 0) {
            soundManager.fadeInBackgroundMusic(fadeIn);
        }

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm.cross'({ key, duration = 500, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.crossFadeBackgroundMusic(key, duration);

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm.stop'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopBackgroundMusic();
    },

    'bgm.fadeOut'({ duration = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutBackgroundMusic2(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm.fadeIn'({ duration = 500 }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeInBackgroundMusic(duration);
    },

    'bgm.pause'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.pauseBackgroundMusic();
    },

    'bgm.resume'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.resumeBackgroundMusic();
    },

    'bgm.mute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusicMute(true);
    },

    'bgm.unmute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusicMute(false);
    },
}