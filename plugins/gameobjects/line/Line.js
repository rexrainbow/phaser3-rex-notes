const RenderTexture = Phaser.GameObjects.RenderTexture;
const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const AngleBetween = Phaser.Math.Angle.Between;

class Line extends RenderTexture {
    constructor(scene, config) {
        var lineStart = GetValue(config, 'start', undefined);
        var lineEnd = GetValue(config, 'end', undefined);
        var lineBody = GetValue(config, 'body', undefined);

        super(scene);
        this
            .setOrigin(0, 0.5)
            .setLineStartPosition(GetValue(lineStart, 'x', 0), GetValue(lineStart, 'y', 0))
            .setLineEndPosition(GetValue(lineEnd, 'x', 0), GetValue(lineEnd, 'y', 0))
            .setLineStartTexture(GetValue(lineStart, 'key', lineStart), GetValue(lineStart, 'frame', undefined))
            .setLineEndTexture(GetValue(lineEnd, 'key', lineEnd), GetValue(lineEnd, 'frame', undefined))
            .setLineBodyTexture(GetValue(lineBody, 'key', lineBody), GetValue(lineBody, 'frame', undefined), GetValue(lineBody, 'width', undefined))

    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.redraw |= (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.redraw |= (this._y0 !== value);
        this._y0 = value;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.redraw |= (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.redraw |= (this._y1 !== value);
        this._y1 = value;
    }

    setLineStartPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    setLineEndPosition(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    setLineStartTexture(key, frame) {
        this.lineStartTexture = key;
        this.lineStartFrameName = frame;
        this.redraw = true;
        return this;
    }

    setLineEndTexture(key, frame) {
        this.lineEndTexture = key;
        this.lineEndFrameName = frame;
        this.redraw = true;
        return this;
    }

    setLineBodyTexture(key, frame, width) {
        this.lineBodyTexture = key;
        this.lineBodyFrameName = frame;
        this.lineBodyWidth = width;
        this.redraw = true;
        return this;
    }

    updateLineTexture() {
        if (!this.redraw) {
            return this;
        }
        this.redraw = false;
        this.clear();

        var lineStartFrame = this.scene.textures.getFrame(this.lineStartTexture, this.lineStartFrameName);
        var lineEndFrame = this.scene.textures.getFrame(this.lineEndTexture, this.lineEndFrameName);
        var lineBodyFrame = this.scene.textures.getFrame(this.lineBodyTexture, this.lineBodyFrameName);
        var width = DistanceBetween(this.x0, this.y0, this.x1, this.y1),
            height = 0,
            rotation = AngleBetween(this.x0, this.y0, this.x1, this.y1);
        if (lineStartFrame) {
            height = lineStartFrame.cutHeight;
        }
        if (lineEndFrame) {
            height = Math.max(height, lineEndFrame.cutHeight);
        }
        if (lineBodyFrame) {
            var tileSpriteHeight = (this.lineBodyWidth !== undefined) ? this.lineBodyWidth : lineBodyFrame.cutWidth;
            height = Math.max(height, tileSpriteHeight);
        }

        width = Math.floor(width);
        height = Math.floor(height);

        // no line
        if ((width <= 0) || (height <= 0)) {
            this
                .setPosition(this.x0, this.y0)
                .setSize(1, 1)
                .setRotation(rotation);
            return this;
        }

        this
            .setPosition(this.x0, this.y0)
            .setSize(width, height)
            .setRotation(rotation)
            .setOrigin(0, 0); // Set origin to (0,0) before pasting textures

        var offsetX, offsetY;
        var remainderWidth = this.width;
        // Draw line start
        if (lineStartFrame) {
            offsetX = 0;
            offsetY = (this.height - lineStartFrame.cutHeight) / 2;
            this.drawFrame(this.lineStartTexture, this.lineStartFrameName, offsetX, offsetY);
            remainderWidth -= lineStartFrame.cutWidth;
        }
        // Draw line end
        if (lineEndFrame) {
            offsetX = this.width - lineEndFrame.cutWidth;
            offsetY = (this.height - lineEndFrame.cutHeight) / 2;
            this.drawFrame(this.lineEndTexture, this.lineEndFrameName, offsetX, offsetY);
            remainderWidth -= lineEndFrame.cutWidth;
        }

        // Draw line body
        if (lineBodyFrame && (remainderWidth > 0) && (tileSpriteHeight > 0)) {
            if (!globTileSprite) {
                globTileSprite = this.scene.make.tileSprite({
                    add: false,
                    origin: { x: 0, y: 0 },
                });
            }

            globTileSprite
                .setSize(remainderWidth, tileSpriteHeight)
                .setTexture(this.lineBodyTexture, this.lineBodyFrameName);

            offsetX = (lineStartFrame) ? lineStartFrame.cutWidth : 0;
            offsetY = (this.height - globTileSprite.height) / 2;
            this.draw(globTileSprite, offsetX, offsetY);
        }

        this.setOrigin(0, 0.5); // Set origin back to (0,0.5)
        return this;
    }

    renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateLineTexture();
        super.renderWebGL(renderer, src, interpolationPercentage, camera, parentMatrix);
    }

    renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix) {
        this.updateLineTexture();
        super.renderCanvas(renderer, src, interpolationPercentage, camera, parentMatrix);
    }
}

var globTileSprite;

export default Line;