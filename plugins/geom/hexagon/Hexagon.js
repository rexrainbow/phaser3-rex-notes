'use strict'

// https://www.redblobgames.com/grids/hexagons/

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

class Hexagon extends Polygon {
    constructor(x, y, size, type) {
        super();
        if (typeof (type) === 'string') {
            type = ORIENTATIONTYPE[type]
        }
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            size = GetValue(config, 'size', 0);
            type = GetValue(config, 'type', 0);
        }
        this.setTo(x, y, size, type);
    }

    // override
    setTo(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        getCorners(this, this.points);
        this.calculateArea();

        this.height = 2 * size;
        this.width = Math.sqrt(3) * size;
        return this;
    }
}


var getCorners = function (hexagon, out) {
    if (out === undefined) {
        out = [];
    }
    var x = hexagon.x,
        y = hexagon.y,
        size = hexagon.size;
    var angleOffset = (hexagon.type === 0) ? 0 : -30;
    var angleDeg, angleRad;
    for (var i = 0; i < 6; i++) {
        angleDeg = (60 * i) + angleOffset;
        angleRad = DegToRad(angleDeg);
        out.push({
            x: x + size * Math.cos(angleRad),
            y: y + size * Math.sin(angleRad)
        });
    }
    return out;
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'vertical': 0,
    'pointy': 1,
    'horizontal': 1
};

export default Hexagon;