import Canvas from '../canvas/Canvas.js';
import DrawCircle from './drawmethods/DrawCircle.js';
import DrawEllipse from './drawmethods/DrawEllipse.js';
import DrawRoundRectangle from './drawmethods/DrawRoundRectangle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CircleMaskImage extends Canvas {
    constructor(scene, x, y, key, frame, config) {
        super(scene, x, y);

        this.type = 'rexCircleMaskImage';
        this.setTexture(key, frame, config);
    }

    setTexture(key, frame, config) {
        if (typeof (frame) === 'object') {
            config = frame;
            frame = undefined;
        }

        var maskType, backgroundColor;
        if (typeof (config) === 'string') {
            maskType = config;
            backgroundColor = undefined;
        } else {
            maskType = GetValue(config, 'maskType', 0);
            backgroundColor = GetValue(config, 'backgroundColor', undefined);
        }

        if (maskType === undefined) {
            maskType = 0;
        } else if (typeof (maskType) === 'string') {
            maskType = MASKTYPE[maskType];
        }

        this._textureKey = key;
        this._frameName = frame;

        if (maskType === null) {
            this.loadTexture(key, frame);
            this.dirty = true;
            return this;
        }

        var HasBackgroundColor = (backgroundColor != null);
        if (!HasBackgroundColor) { // No background color -- draw image first
            this.loadTexture(key, frame);
        }

        // Draw mask
        var canvas = this.canvas,
            ctx = this.context;
        var width = canvas.width,
            height = canvas.height;

        ctx.save();
        ctx.globalCompositeOperation = (HasBackgroundColor) ? 'source-over' : 'destination-in';
        ctx.beginPath();

        // Draw circle, ellipse, or roundRectangle
        switch (maskType) {
            case 0:
                DrawCircle(ctx, width, height);
                break;
            case 1:
                DrawEllipse(ctx, width, height);
                break;
            case 2:
                var radiusConfig = GetValue(config, 'radius', undefined);
                DrawRoundRectangle(ctx, width, height, radiusConfig);
                break;
        }

        if (HasBackgroundColor) {
            ctx.fillStyle = backgroundColor;
        }
        ctx.fill();
        ctx.restore();

        if (HasBackgroundColor) {  // Has background color -- draw image last
            ctx.save();
            ctx.globalCompositeOperation = 'destination-atop';
            this.loadTexture(key, frame);
            ctx.restore();
        }

        this.dirty = true;
        return this;
    }
}

const MASKTYPE = {
    circle: 0,
    ellipse: 1,
    roundRectangle: 2
}

export default CircleMaskImage;