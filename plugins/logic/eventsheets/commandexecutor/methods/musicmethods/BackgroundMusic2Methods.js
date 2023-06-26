export default {
    bgm2({ volume, mute, unmute } = {}, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }

        if (volume !== undefined) {
            soundManager.setBackgroundMusic2Volume(volume);
        }

        if (mute !== undefined) {
            soundManager.setBackgroundMusic2Mute(mute);
        } else if (unmute !== undefined) {
            soundManager.setBackgroundMusic2Mute(!unmute);
        }
    },

    'bgm2.play'({ key, volume, detune, rate, fadeIn = 0, loop, wait = false } = {}, manager) {
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

        if (detune !== undefined) {
            soundManager.setBackgroundMusic2Detune(detune);
        }

        if (rate !== undefined) {
            soundManager.setBackgroundMusic2Rate(rate);
        }

        if (fadeIn > 0) {
            soundManager.fadeInBackgroundMusic2(fadeIn);
        }

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm2.cross'({ key, duration = 500, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        if (!key) {
            return;
        }

        soundManager.crossFadeBackgroundMusic2(key, duration);

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm2.stop'(config, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.stopBackgroundMusic2();
    },

    'bgm2.fadeOut'({ duration = 500, stop = true, wait = false }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeOutBackgroundMusic2(duration, stop);

        if (wait) {
            return this.wait({ bgm: true }, manager);
        }
    },

    'bgm2.fadeIn'({ duration = 500 }, manager) {
        var soundManager = this.sys.soundManager;
        if (!soundManager) {
            return;
        }
        soundManager.fadeInBackgroundMusic2(duration);
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