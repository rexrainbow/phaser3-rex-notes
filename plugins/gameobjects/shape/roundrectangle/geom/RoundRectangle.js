const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle {
    constructor(x, y, width, height, radiusConfig) {
        this.cornerRadius = {};
        this.width = 0;
        this.height = 0;
        this.setTo(x, y, width, height, radiusConfig);
    }

    setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }
        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(radiusConfig) {
        if (radiusConfig === undefined) {
            radiusConfig = 0;
        }
        var radius = this.cornerRadius;
        if (typeof (radiusConfig) === 'number') {
            radius.tl = radiusConfig;
            radius.tr = radiusConfig;
            radius.bl = radiusConfig;
            radius.br = radiusConfig;
        } else {
            radius.tl = GetValue(radiusConfig, 'tl', 0);
            radius.tr = GetValue(radiusConfig, 'tr', 0);
            radius.bl = GetValue(radiusConfig, 'bl', 0);
            radius.br = GetValue(radiusConfig, 'br', 0);
        }
        return this;
    }

    setSize(width, height) {
        if (width === undefined) {
            var radius = this.cornerRadius;
            width = Math.max(radius.tl + radius.tr, radius.bl + radius.br);
        }
        if (height === undefined) {
            var radius = this.cornerRadius;
            height = Math.max(radius.tl + radius.bl, radius.tr + radius.br);
        }
        this.width = width;
        this.height = height;
        return this;
    }
}
export default RoundRectangle;