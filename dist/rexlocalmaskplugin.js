(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlocalmaskplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.off('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }


            this.destroyEventEmitter();

            this.parent = undefined;
            this.scene = undefined;
            this.game = undefined;

            this.isShutdown = true;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods
    );

    const fragShader = `
precision mediump float;
uniform sampler2D uMainSampler;
uniform sampler2D uMaskSampler;
varying vec2 outTexCoord;

void main ()
{
    vec4 color = texture2D(uMainSampler, outTexCoord);
    vec4 maskColor = texture2D(uMaskSampler, outTexCoord);
    gl_FragColor = vec4(color.rgb * maskColor.a, color.a * maskColor.a);
}
`;

    var ControllerKey$1 = 'localMask';

    class LocalMaskPreFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
        constructor(game) {
            super({
                game: game,
                fragShader: fragShader
            });
        }

        onDraw(renderTarget) {
            var sprite = this.tempSprite;
            var glTexture = sprite[ControllerKey$1].maskGLTexture;

            this.set1i('uMainSampler', 0);
            this.set1i('uMaskSampler', 1);
            this.bindTexture(glTexture, 1);

            super.onDraw(renderTarget);
        }

        static setControllerKey(key) {
            ControllerKey$1 = key;
        }
    }

    const GetValue = Phaser.Utils.Objects.GetValue;
    const PreFXName = 'RexLocalMaskFx';
    var ControllerKey = 'rexLocalMask';

    class LocalMaskController extends ComponentBase {
        constructor(parent, config) {
            super(parent, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            var scene = this.scene;
            var pipelines = scene.sys.renderer.pipelines;
            var pipeline = pipelines.get(PreFXName);
            if (!pipeline) {
                ControllerKey = GetValue(config, 'controllerKey', ControllerKey);
                LocalMaskPreFxPipeline.setControllerKey(ControllerKey);
                pipeline = pipelines.add(PreFXName, new LocalMaskPreFxPipeline(scene.game));
            }
            this.pipelineInstance = pipeline;

            this.textures = scene.sys.textures;

            this.parent[ControllerKey] = this;

            this.setMaskTexture(GetValue(config, 'key'), GetValue(config, 'frame'));
            this.setEnable(GetValue(config, 'enable', true));
        }

        shutdown(fromScene) {
            this.pipelineInstance = undefined;
            this.textures = undefined;
            this.maskFrame = undefined;
            this.maskGLTexture = undefined;

            super.shutdown(fromScene);
        }

        get controllerKey() {
            return ControllerKey;
        }

        get enable() {
            return this._enable;
        }

        set enable(value) {
            if (value === this._enable) {
                return;
            }

            this._enable = value;
            var gameObject = this.parent;
            var currentPipeline = gameObject.pipeline;
            if (value) { // Enable
                if (currentPipeline !== this.pipelineInstance) {
                    gameObject.setPipeline(this.pipelineInstance);
                }
            } else { // Reset to default
                if (currentPipeline === this.pipelineInstance) {
                    gameObject.resetPipeline();
                }
            }

        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.enable = enable;
            return this;
        }

        setMaskTexture(key, frame) {
            this.maskKey = key;
            this.maskFrameName = frame;
            this.maskFrame = this.textures.getFrame(key, frame);
            this.maskGLTexture = this.maskFrame.glTexture;
            return this;
        }
    }

    class LocalMaskPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new LocalMaskController(gameObject, config);
        }

    }

    return LocalMaskPlugin;

}));
