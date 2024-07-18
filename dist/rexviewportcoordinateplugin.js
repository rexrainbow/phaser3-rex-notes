(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexviewportcoordinateplugin = factory());
})(this, (function () { 'use strict';

    const EventEmitter = Phaser.Events.EventEmitter;

    var MonitorViewport = function (viewport) {
        // Don't monitor properties again
        if (viewport.events) {
            return viewport;
        }

        var events = new EventEmitter();

        var x = viewport.x;
        Object.defineProperty(viewport, 'x', {
            get: function () {
                return x;
            },

            set: function (value) {
                if (x !== value) {
                    x = value;
                    events.emit('update', viewport);
                }
            },
        });

        var y = viewport.y;
        Object.defineProperty(viewport, 'y', {
            get: function () {
                return y;
            },

            set: function (value) {
                if (y !== value) {
                    y = value;
                    events.emit('update', viewport);
                }
            },
        });

        var width = viewport.width;
        Object.defineProperty(viewport, 'width', {
            get: function () {
                return width;
            },

            set: function (value) {
                if (width !== value) {
                    width = value;
                    events.emit('update', viewport);
                }
            },
        });

        var height = viewport.height;
        Object.defineProperty(viewport, 'height', {
            get: function () {
                return height;
            },

            set: function (value) {
                if (height !== value) {
                    height = value;
                    events.emit('update', viewport);
                }
            },
        });

        viewport.events = events;

        return viewport;
    };

    var VPXYToXY = function (vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobXY;
        }

        if (typeof (vpxOffset) !== 'number') {
            vpxOffset = 0;
            vpyOffset = 0;
        }

        out.x = viewport.x + (viewport.width * vpx) + vpxOffset;
        out.y = viewport.y + (viewport.height * vpy) + vpyOffset;
        return out;
    };

    var GlobXY = {};

    var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
        // Don't attach properties again
        if (gameObject.hasOwnProperty('vp')) {
            return gameObject;
        }

        if (typeof (vpx) === 'function') {
            transformCallback = vpx;
            vpx = undefined;
        }

        if (typeof (vpxOffset) === 'function') {
            transformCallback = vpxOffset;
            vpxOffset = undefined;
        }


        if (vpx === undefined) { vpx = 0.5; }
        if (vpy === undefined) { vpy = 0.5; }
        if (vpxOffset === undefined) { vpxOffset = 0; }
        if (vpyOffset === undefined) { vpyOffset = 0; }

        if (transformCallback === undefined) {
            transformCallback = VPXYToXY;
        }

        MonitorViewport(viewport);
        var events = viewport.events;

        gameObject.vp = viewport;

        // Set position of game object when view-port changed.
        var Transform = function () {
            transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
        };

        events.on('update', Transform);
        gameObject.once('destroy', function () {
            events.off('update', Transform);
            gameObject.vp = undefined;
        });

        Object.defineProperty(gameObject, 'vpx', {
            get: function () {
                return vpx;
            },
            set: function (value) {
                if (vpx !== value) {
                    vpx = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpy', {
            get: function () {
                return vpy;
            },
            set: function (value) {
                if (vpy !== value) {
                    vpy = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpxOffset', {
            get: function () {
                return vpxOffset;
            },
            set: function (value) {
                if (vpxOffset !== value) {
                    vpxOffset = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpyOffset', {
            get: function () {
                return vpyOffset;
            },
            set: function (value) {
                if (vpyOffset !== value) {
                    vpyOffset = value;
                    Transform();
                }
            },
        });

        Transform();
    };

    class ViewportCoordinatePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, viewport, vpx, vpy, transformCallback) {
            return AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback);
        }

        vpxyToxy(vpx, vpy, viewport, out) {
            return VPXYToXY(vpx, vpy, viewport, out);
        }
    }

    return ViewportCoordinatePlugin;

}));
