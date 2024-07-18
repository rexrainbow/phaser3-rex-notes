(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscaleouterplugin = factory());
})(this, (function () { 'use strict';

    var WarnCounter = 0;

    var CheckScaleMode = function (scene) {
        var scaleManager = scene.sys.scale;
        if (scaleManager.scaleMode === Phaser.Scale.RESIZE) {
            return true;
        }

        // Not RESIZE mode
        if (WarnCounter === 0) {
            console.warn('Scale outer only works with RESIZE scale mode');
        }
        WarnCounter++;
        return false;
    };

    var GetScaleOutCameraParameters = function (scene, out) {
        if (out === undefined) {
            out = {};
        }

        var gameConfig = scene.game.config;
        var gameWidth = gameConfig.width,
            gameHeight = gameConfig.height;
        var gameAspectRatio = (gameHeight === 0) ? 1 : gameWidth / gameHeight;

        var displaySize = scene.sys.scale.displaySize;
        var displayWidth = displaySize.width,
            displayHeight = displaySize.height;
        var displayAspectRatio = (displayHeight === 0) ? 1 : displayWidth / displayHeight;

        out.scrollX = (gameWidth - displayWidth) / 2;
        out.scrollY = (gameHeight - displayHeight) / 2;

        if (gameAspectRatio < displayAspectRatio) {
            out.zoom = (displayHeight / gameHeight);
        } else {
            out.zoom = (displayWidth / gameWidth);
        }

        return out;
    };

    const Rectangle$2 = Phaser.Geom.Rectangle;
    var GetInnerViewport = function (scaleOuter, out) {
        if (out === undefined) {
            out = new Rectangle$2();
        }

        var gameConfig = scaleOuter.scene.game.config;
        var width = gameConfig.width,
            height = gameConfig.height;
        out.setTo(0, 0, width, height);
        return out;
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;
    var GetOuterViewport = function (scaleOuter, out) {
        if (out === undefined) {
            out = new Rectangle$1();
        }

        var scale = 1 / scaleOuter.zoom;
        var displaySize = scaleOuter.scene.sys.scale.displaySize;
        out.width = displaySize.width * scale;
        out.height = displaySize.height * scale;

        var gameConfig = scaleOuter.scene.game.config;
        out.centerX = gameConfig.width / 2;
        out.centerY = gameConfig.height / 2;

        return out;
    };

    var ShrinkSizeByRatio = function (rectangle, maxRatio, minRatio) {
        var width = rectangle.width,
            height = rectangle.height,
            ratio = width / height;

        if ((maxRatio !== undefined) && (ratio > maxRatio)) {
            rectangle.width = height * maxRatio;  // Shrink width
        }

        if ((minRatio !== undefined) && (ratio < minRatio)) {
            rectangle.height = width / minRatio; // Shrink height
        }

        return rectangle;
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const CopyRectangle = Phaser.Geom.Rectangle.CopyFrom;
    const SetStruct = Phaser.Structs.Set;

    class ScaleOuter {
        constructor(scene) {
            this.scene = scene;
            // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

            this.cameras = new SetStruct();
            this.scrollX = 0;
            this.scrollY = 0;
            this.zoom = 1;

            this._innerViewport = undefined;
            this._outerViewport = undefined;
            this._shrinkOuterViewport = undefined;

            this.boot();
        }

        boot() {
            var scene = this.scene;
            if (CheckScaleMode(scene)) {
                scene.sys.scale.on('resize', this.scale, this);
                scene.sys.game.events.once('prestep',this.start, this);
            }

            scene.sys.events.on('shutdown', function () {
                // cameras of this scene will be destroyed when scene shutdown
                this.cameras.clear();
            }, this);
        }

        destroy() {
            this.stop();

            this.cameras.clear();
            this.cameras = undefined;
            this.scene = undefined;
            this._innerViewport = undefined;
            this._outerViewport = undefined;
            this._shrinkOuterViewport = undefined;
        }

        start() {
            if (this.cameras.size === 0) {
                // Add default camera
                this.add(this.scene.sys.cameras.main);
            }

            this.scale();

            return this;
        }

        stop() {
            var scene = this.scene;
            scene.sys.scale.off('resize', this.scale, this);
            scene.sys.game.events.off('prestep',this.start, this);
            return this;
        }

        add(camera) {
            this.cameras.set(camera);
            this.scale();
            return this;
        }

        get innerViewport() {
            return this._innerViewport;
        }

        get outerViewport() {
            return this._outerViewport;
        }

        getShrinkedOuterViewport(maxRatio, minRatio, out) {
            if (typeof (minRatio) !== 'number') {
                out = minRatio;
                minRatio = undefined;
            }

            if (out === undefined) {
                out = new Rectangle();
            } else if (out === true) {
                if (this._shrinkOuterViewport === undefined) {
                    this._shrinkOuterViewport = new Rectangle();
                }
                out = this._shrinkOuterViewport;
            }

            CopyRectangle(this._outerViewport, out);
            ShrinkSizeByRatio(out, maxRatio, minRatio);
            out.centerX = this._outerViewport.centerX;
            out.centerY = this._outerViewport.centerY;

            return out;
        }

        // Internal methods
        onFirstTick() {
            if (this.cameras.size === 0) {
                // Add default camera
                this.add(this.scene.sys.cameras.main);
            }
            this.scale();
        }

        scale() {
            GetScaleOutCameraParameters(this.scene, this);
            this.cameras.iterate(function (camera, index) {
                camera.zoomX = this.zoom;
                camera.zoomY = this.zoom;
                camera.scrollX = this.scrollX;
                camera.scrollY = this.scrollY;
            }, this);

            this._innerViewport = GetInnerViewport(this, this._innerViewport);
            this._outerViewport = GetOuterViewport(this, this._outerViewport);

            return this;
        }
    }

    class ScaleOuterPlugin extends Phaser.Plugins.ScenePlugin {
        constructor(scene, pluginManager) {
            super(scene, pluginManager);
            this.scaleOuter = new ScaleOuter(scene);
        }

        boot() {
            var eventEmitter = this.scene.sys.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        destroy() {
            this.scaleOuter.destroy();
            this.scaleOuter = undefined;
            super.destroy();
        }

        add(camera) {
            this.scaleOuter.add(camera);
            return this;
        }

        scale() {
            if (this.scaleOuter.cameras.size === 0) {
                // Add default camera
                this.add(this.scene.sys.cameras.main);
            }
            this.scaleOuter.scale();
            return this;
        }

        stop() {
            this.scaleOuter.stop();
            return this;
        }

        get scrollX() {
            return this.scaleOuter.scrollX;
        }

        get scrollY() {
            return this.scaleOuter.scrollY;
        }

        get zoom() {
            return this.scaleOuter.zoom;
        }

        get innerViewport() {
            return this.scaleOuter.innerViewport;
        }

        get outerViewport() {
            return this.scaleOuter.outerViewport;
        }

        getShrinkedOuterViewport(maxRatio, minRatio, out) {
            return this.scaleOuter.getShrinkedOuterViewport(maxRatio, minRatio, out);
        }
    }

    return ScaleOuterPlugin;

}));
