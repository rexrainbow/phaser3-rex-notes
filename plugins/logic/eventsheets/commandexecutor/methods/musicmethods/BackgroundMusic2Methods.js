export default {
    'bgm2.play'({ key, loop, volume, fadeIn = 0, wait = false } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        if (loop !== undefined) {
            soundManager.setBackgroundMusic2LoopValue(loop);
        }

        soundManager.playBackgroundMusic2(key);

        if (volume !== undefined) {
            soundManager.setBackgroundMusic2Volume(volume);
        }
        if (fadeIn > 0) {
            soundManager.fadeInBackgroundMusic2(fadeIn);
        }

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'bgm2.cross'({ key, time = 500, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.crossFadeBackgroundMusic2(key, time);

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'bgm2.stop'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopBackgroundMusic2();
    },

    'bgm2.fadeOut'({ time = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutBackgroundMusic2(time, stop);

        if (wait) {
            return this.wait({ bgm: true });
        }
    },

    'bgm2.fadeIn'({ time = 500 }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeInBackgroundMusic2(time);
    },

    'bgm2.pause'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.pauseBackgroundMusic2();
    },

    'bgm2.resume'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.resumeBackgroundMusic2();
    },

    'bgm2.volume'({ value = 1 } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.setBackgroundMusic2Volume(value);
    },

    'bgm2.mute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusic2Mute(true);
    },

    'bgm2.unmute'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        soundManager.setBackgroundMusic2Mute(false);
    },
}