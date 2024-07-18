(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpolarcoordinateplugin = factory());
})(this, (function () { 'use strict';

    var PolarToCartesian = function (ox, oy, rotation, radius, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        out.x = (radius * Math.cos(rotation)) + ox;
        out.y = (radius * Math.sin(rotation)) + oy;

        return out;
    };

    var globOut = {};

    var DegToRad = Phaser.Math.DegToRad;
    var RadToDeg = Phaser.Math.RadToDeg;

    var AddPolarCoordinateProperties = function (gameObject, ox, oy, rotation, radius) {
        // Don't attach properties again
        if (gameObject.hasOwnProperty('polarOX')) {
            return gameObject;
        }

        if (ox === undefined) {
            ox = 0;
        }
        if (oy === undefined) {
            oy = 0;
        }
        if (rotation === undefined) {
            rotation = 0;
        }
        if (radius === undefined) {
            radius = 0;
        }

        Object.defineProperty(gameObject, 'polarOX', {
            get: function () {
                return ox;
            },
            set: function (value) {
                if (ox !== value) {
                    ox = value;
                    PolarToCartesian(ox, oy, rotation, radius, gameObject);
                }
            },
        });

        Object.defineProperty(gameObject, 'polarOY', {
            get: function () {
                return oy;
            },
            set: function (value) {
                if (oy !== value) {
                    oy = value;
                    PolarToCartesian(ox, oy, rotation, radius, gameObject);
                }
            },
        });

        Object.defineProperty(gameObject, 'polarRotation', {
            get: function () {
                return rotation;
            },
            set: function (value) {
                if (rotation !== value) {
                    rotation = value;
                    PolarToCartesian(ox, oy, rotation, radius, gameObject);
                }
            },
        });
        Object.defineProperty(gameObject, 'polarAngle', {
            get: function () {
                return RadToDeg(rotation);
            },
            set: function (value) {
                this.polarRotation = DegToRad(value);
            },
        });

        Object.defineProperty(gameObject, 'polarRadius', {
            get: function () {
                return radius;
            },
            set: function (value) {
                if (radius !== value) {
                    radius = value;
                    PolarToCartesian(ox, oy, rotation, radius, gameObject);
                }
            },
        });

        PolarToCartesian(ox, oy, rotation, radius, gameObject);
    };

    class PolarCoordinatePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, ox, oy, rotation, radius) {
            return AddPolarCoordinateProperties(gameObject, ox, oy, rotation, radius)
        }
    }

    return PolarCoordinatePlugin;

}));
