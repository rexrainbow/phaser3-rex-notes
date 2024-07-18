(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbuildarcadeobjectplugin = factory());
})(this, (function () { 'use strict';

    const Components = Phaser.Physics.Arcade.Components;

    var ArcadeMethods = {};
    Object.assign(
        ArcadeMethods,
        Components.Acceleration,
        Components.Angular,
        Components.Bounce,
        Components.Debug,
        Components.Drag,
        Components.Enable,
        Components.Friction,
        Components.Gravity,
        Components.Immovable,
        Components.Mass,
        Components.Size,
        Components.Velocity
    );

    var BuildArcadeObject = function (gameObject, isStatic) {
        if (!Array.isArray(gameObject)) {
            Build(gameObject, isStatic);
        } else {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Build(gameObjects[i], isStatic);
            }
        }

        return gameObject;
    };

    var Build = function (gameObject, isStatic) {
        if (!gameObject.body) {
            if (isStatic === undefined) {
                isStatic = false;
            }
            gameObject.scene.physics.add.existing(gameObject, isStatic);
        }

        Object.assign(gameObject, ArcadeMethods);

        return gameObject;
    };

    class BuildArcadeObjectPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        build(gameObject, isStatic) {
            return BuildArcadeObject(gameObject, isStatic);
        }

        injectMethods(gameObject) {
            Object.assign(gameObject, ArcadeMethods);
            return gameObject;
        }

        injectMethodsToRootClass() {
            this.injectMethods(Phaser.GameObjects.GameObject.prototype);
            return this;
        }
    }

    return BuildArcadeObjectPlugin;

}));
