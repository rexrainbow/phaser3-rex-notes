(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextintrgbplugin = factory());
})(this, (function () { 'use strict';

    var GetR = function (colorInt) {
        return (colorInt >> 16) & 0xff;
    };

    var GetG = function (colorInt) {
        return (colorInt >> 8) & 0xff;
    };

    var GetB = function (colorInt) {
        return (colorInt) & 0xff;
    };

    const MaskR = (~(0xff << 16) & 0xffffff);
    const MaskG = (~(0xff << 8) & 0xffffff);
    const MaskB = (~(0xff) & 0xffffff);

    var SetR = function (colorInt, r) {
        return ((r & 0xff) << 16) | (colorInt & MaskR);
    };

    var SetG = function (colorInt, g) {
        return ((g & 0xff) << 8) | (colorInt & MaskG);
    };

    var SetB = function (colorInt, b) {
        return (b & 0xff) | (colorInt & MaskB);
    };

    var SetRGB = function (colorInt, r, g, b) {
        return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
    };

    var AddTintRGBProperties = function (gameObject, tintRGB) {
        // Don't attach properties again
        if (gameObject.hasOwnProperty('tintR')) {
            return gameObject;
        }

        if (tintRGB === undefined) {
            tintRGB = 0xffffff;
        }

        var tintR = GetR(tintRGB);
        var tintG = GetG(tintRGB);
        var tintB = GetB(tintRGB);

        // Override tint property
        Object.defineProperty(gameObject, 'tint', {
            get: function () {
                return tintRGB;
            },
            set: function (value) {
                value = Math.floor(value) & 0xffffff;
                if (gameObject.setTint) {
                    gameObject.setTint(value);
                }
                if (tintRGB !== value) {
                    tintRGB = value;
                    tintR = GetR(tintRGB);
                    tintG = GetG(tintRGB);
                    tintB = GetB(tintRGB);
                    // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
                }
            }
        });

        Object.defineProperty(gameObject, 'tintR', {
            get: function () {
                return tintR;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintR !== value) {
                    tintR = value;
                    gameObject.tint = SetR(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintG', {
            get: function () {
                return tintG;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintG !== value) {
                    tintG = value;
                    gameObject.tint = SetG(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintB', {
            get: function () {
                return tintB;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintB !== value) {
                    tintB = value;
                    gameObject.tint = SetB(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintGray', {
            get: function () {
                return Math.floor((tintR + tintG + tintB) / 3);
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if ((tintR !== value) || (tintG !== value) || (tintB !== value)) {
                    tintR = value;
                    tintG = value;
                    tintB = value;
                    gameObject.tint = SetRGB(tintRGB, value, value, value);
                }
            },
        });

        gameObject.tint = tintRGB;

        return gameObject;
    };

    class TintRGBPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, tintRGB) {
            return AddTintRGBProperties(gameObject, tintRGB)
        }
    }

    return TintRGBPlugin;

}));
