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

    setRadius(config) {
        if (config === undefined) {
            config = 0;
        }
        var defaultRadiusX, defaultRadiusY;
        if (typeof (config) === 'number') {
            defaultRadiusX = config;
            defaultRadiusY = config;
        } else {
            defaultRadiusX = GetValue(config, 'x', 0);
            defaultRadiusY = GetValue(config, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue(config, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue(config, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue(config, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue(config, 'br', undefined), defaultRadiusX, defaultRadiusY);
        return this;
    }

    setSize(width, height) {
        if (width === undefined) {
            var radius = this.cornerRadius;
            width = Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }
        if (height === undefined) {
            var radius = this.cornerRadius;
            height = Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }
        this.width = width;
        this.height = height;
        return this;
    }
}

var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
        return {
            x: defaultRadiusX,
            y: defaultRadiusY
        };
    } else if (typeof (radius) === 'number') {
        return {
            x: radius,
            y: radius
        };
    } else {
        return radius;
    }
}
export default RoundRectangle;