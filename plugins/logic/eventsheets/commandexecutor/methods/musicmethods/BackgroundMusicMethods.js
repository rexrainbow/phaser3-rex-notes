export default {
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
            return this.wait({ bgm: true });
        }
    },

    'bgm.cross'({ key, time = 500, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.crossFadeBackgroundMusic(key, time);

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'bgm.stop'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopBackgroundMusic();
    },

    'bgm.fadeOut'({ time = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutBackgroundMusic2(time, stop);

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'bgm.fadeIn'({ time = 500 }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeInBackgroundMusic(time);
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

    'bgm.volume'({ value = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setBackgroundMusicVolume(value);
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