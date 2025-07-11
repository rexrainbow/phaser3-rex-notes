import EaseValueTask from '../../../../utils/ease/EaseValueTask.js';
import OnTextureChange from './OnTextureChange.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const GetRandomItem = Phaser.Utils.Array.GetRandom;

var DirMode = {
    out: 0,
    in: 1
}

var GetValueFromConfigs = function (key, defaultValue, ...configs) {
    for (var i = 0, cnt = configs.length; i < cnt; i++) {
        var config = configs[i];
        if (config && config.hasOwnProperty(key)) {
            return config[key];
        }
    }
    return defaultValue;
}

export default {
    setTransitionDirection(dir) {
        if (typeof (dir) === 'string') {
            dir = DirMode[dir];
        }
        this.dir = dir;
        return this;
    },

    setDuration(duration) {
        this.duration = duration;
        return this;
    },

    setEaseFunction(ease) {
        this.easeFunction = ease;
        return this;
    },

    setNextTexture(texture, frame) {
        this.nextImage.setTexture(texture, frame);

        OnTextureChange.call(this, this.nextImage);
        return this;
    },

    transit(texture, frame, mode) {
        if (this.isRunning) {
            this.ignoreCompleteEvent = true;
            this.stop();
            this.ignoreCompleteEvent = false;
        }

        if (mode !== undefined) {
            texture = {
                key: texture,
                frame: frame,
                mode: mode
            }
        }

        this.currentTransitionMode = undefined;

        if (IsPlainObject(texture)) {
            var config = texture;
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);

            mode = GetValue(config, 'mode');
            if (Array.isArray(mode)) {
                mode = GetRandomItem(mode);
            }

            var modeConfig;
            if (this.transitionModes && this.transitionModes.hasOwnProperty(mode)) {
                modeConfig = this.transitionModes[mode];
                this.currentTransitionMode = mode;
            }

            this
                .setDuration(GetValueFromConfigs('duration', this.duration, config, modeConfig))
                .setEaseFunction(GetValueFromConfigs('ease', this.easeFunction, config, modeConfig))
                .setTransitionDirection(GetValueFromConfigs('dir', this.dir, config, modeConfig))

            var maskGameObject = GetValueFromConfigs('mask', undefined, config, modeConfig);
            if (maskGameObject) {
                this.setMaskGameObject(maskGameObject);
            }
            this.setMaskEnable(maskGameObject === true);

            var onStart = GetValueFromConfigs('onStart', undefined, config, modeConfig);
            var onProgress = GetValueFromConfigs('onProgress', undefined, config, modeConfig);
            var onComplete = GetValueFromConfigs('onComplete', undefined, config, modeConfig);
            if ((onStart !== undefined) || (onProgress !== undefined) || (onComplete !== undefined)) {
                this
                    .setTransitionStartCallback(
                        onStart,
                        GetValueFromConfigs('onStartScope', undefined, config, modeConfig)
                    )
                    .setTransitionProgressCallback(
                        onProgress,
                        GetValueFromConfigs('onProgressScope', undefined, config, modeConfig)
                    )
                    .setTransitionCompleteCallback(
                        onComplete,
                        GetValueFromConfigs('onCompleteScope', undefined, config, modeConfig)
                    )
            }
        }

        this.setNextTexture(texture, frame);

        this.start();
        return this;
    },

    addTransitionMode(name, config) {
        if (this.transitionModes === undefined) {
            this.transitionModes = {};
        }

        if (IsPlainObject(name)) {
            config = name;
            name = config.name;
            delete config.name;
        }

        this.transitionModes[name] = config;
        return this;
    },

    start() {
        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }
        this.easeValueTask.restart({
            key: 't', from: 0, to: 1,
            duration: this.duration,
            ease: this.easeFunction
        });
        return this;
    },

    pause() {
        if (this.easeValueTask) {
            this.easeValueTask.pause();
        }
        return this;
    },

    resume() {
        if (this.easeValueTask) {
            this.easeValueTask.resume();
        }
        return this;
    },

    stop() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        this.setT(1);
        return this;
    },
}