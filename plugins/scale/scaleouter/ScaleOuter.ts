import CheckScaleMode from './CheckScaleMode';
import GetScaleOutCameraParameters from './GetScaleOuterCameraParameters';
import GetInnerViewport from './GetInnerViewport';
import GetOuterViewport from './GetOuterViewport';
import ShrinkSizeByRatio from './ShrinkSizeByRatio'

import { Geom as PhaserGeom } from 'phaser';
const Rectangle = PhaserGeom.Rectangle;
const CopyRectangle = PhaserGeom.Rectangle.CopyFrom;

class ScaleOuter {
    _innerViewport: any;
    _outerViewport: any;
    _shrinkOuterViewport: any;
    cameras: any;
    scene: any;
    scrollX: any;
    scrollY: any;
    zoom: any;

    constructor(scene?: any) {
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        this.cameras = new Set();
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

        scene.sys.events.on('shutdown', function() {
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

    add(camera?: any) {
        this.cameras.add(camera)
        this.scale();
        return this;
    }

    get innerViewport() {
        return this._innerViewport;
    }

    get outerViewport() {
        return this._outerViewport;
    }

    getShrinkedOuterViewport(maxRatio?: any, minRatio?: any, out?: any) {
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
        this.cameras.forEach(function(camera?: any, index?: any) {
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

export default ScaleOuter;