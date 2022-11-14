import Canvas from '../canvas/Canvas.js';
import AddRoundRectanglePath from '../../../utils/canvas/AddRoundRectanglePath.js';

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

        if (typeof (config) === 'string') {
            config = {
                maskType: config
            };
        }

        var maskType = GetValue(config, 'maskType', 0);
        var backgroundColor = GetValue(config, 'backgroundColor', undefined);
        var strokeColor = GetValue(config, 'strokeColor', undefined);
        var strokeLineWidth = GetValue(config, 'strokeLineWidth', (strokeColor != null) ? 2 : 0);

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

        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
            return this;
        }
        if ((textureFrame.cutWidth !== this.width) || (textureFrame.cutHeight !== this.height)) {
            this.setCanvasSize(textureFrame.cutWidth, textureFrame.cutHeight);
        } else {
            this.clear();
        }

        // Draw mask
        var canvas = this.canvas,
            ctx = this.context;
        var width = canvas.width,
            height = canvas.height;

        if (backgroundColor != null) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }

        ctx.save();
        ctx.beginPath();

        // Draw circle, ellipse, or roundRectangle        
        switch (maskType) {
            case 2:
                var radiusConfig = GetValue(config, 'radius', 0);
                var iteration = GetValue(config, 'iteration', undefined);
                var doubleStrokeLineWidth = strokeLineWidth * 2;
                AddRoundRectanglePath(
                    ctx,
                    strokeLineWidth, strokeLineWidth,
                    width - doubleStrokeLineWidth, height - doubleStrokeLineWidth,
                    radiusConfig,
                    iteration
                );
                break;

            default: // circle, ellipse
                var centerX = Math.floor(width / 2);
                var centerY = Math.floor(height / 2);
                if (maskType === 0) {
                    var radius = Math.min(centerX, centerY) - strokeLineWidth;
                    ctx.arc(centerX, centerY, radius, 0, (2 * Math.PI));
                } else {
                    var radiusX = centerX - strokeLineWidth;
                    var radiusY = centerY - strokeLineWidth;
                    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, (2 * Math.PI));
                }
                break;
        }

        if (strokeColor != null) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeLineWidth;
            ctx.stroke();
        }

        ctx.clip();
        this.loadTexture(key, frame);
        ctx.restore();

        this.dirty = true;
        return this;
    }

    resize(width, height) {
        // Don't draw content again.
        this.setDisplaySize(width, height);
        return this;
    }
}

const MASKTYPE = {
    circle: 0,
    ellipse: 1,
    roundRectangle: 2
}

export default CircleMaskImage;