import PolygnBase from '../utils/polygonbase/PolygnBase';
import RoundRectangleGeom from '../../../geom/roundrectangle/RoundRectangle';
import IsArcCorner from '../utils/IsArcCorner';
import LineTo from '../../../geom/pathdata/LineTo';
import ArcTo from '../../../geom/pathdata/ArcTo';

import { Geom as PhaserGeom, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const Earcut = PhaserGeom.Polygon.Earcut;

const GetDefaultIteration = function(radius?: any) {
    return Math.max(6, Math.min(16, Math.ceil(radius / 2)));
};

class RoundRectangle extends PolygnBase {
    shapeType: any;

    _iteration: any;
    _useDynamicIteration: any;
    dirty: any;
    geom: any;
    init: any;
    pathData: any;
    pathIndexes: any;
    setDashPattern: any;
    setFillStyle: any;
    setPosition: any;
    setStrokeStyle: any;
    updateDisplayOrigin: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, radiusConfig?: any, fillColor?: any, fillAlpha?: any) {
        var strokeColor, strokeAlpha, strokeWidth, shapeType;
        var dashPattern, dashOffset;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            radiusConfig = config.radius;
            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;

            shapeType = config.shape;

            dashPattern = config.dashPattern;
            dashOffset = config.dashOffset;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }
        if (radiusConfig === undefined) { radiusConfig = 0; }
        if (shapeType === undefined) { shapeType = 0; }

        var geom = new RoundRectangleGeom();  // Configurate it later
        super(scene, 'rexRoundRectangleShape', geom);
        this.init();

        this.setShapeType(shapeType);

        if (this.shapeType === 0) {
            var radius = GetValue(radiusConfig, 'radius', radiusConfig);
            geom.setTo(0, 0, width, height, radius);
        } else {
            var radius = { x: (width / 2), y: (height / 2) };
            geom.setTo(0, 0, width, height, radius);
        }

        this.setIteration(GetValue(radiusConfig, 'iteration', undefined));
        this.setPosition(x, y);

        this.setFillStyle(fillColor, fillAlpha);

        if (strokeWidth === undefined) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        if (dashPattern?: any) {
            this.setDashPattern(dashPattern, dashOffset);
        }

        this.updateDisplayOrigin();
        this.dirty = true;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;

        pathData.length = 0;

        var width = geom.width,
            height = geom.height,
            cornerRadius = geom.cornerRadius,
            radius,
            iteration = this.iteration + 1;

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
            } else {
                var centerX = 0;
                var centerY = 0;
                ArcTo(centerX, centerY, radius.x, radius.y, 90, 0, true, iteration, pathData);
            }
        } else {
            LineTo(0, 0, pathData);
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
            } else {
                var centerX = width;
                var centerY = 0;
                ArcTo(centerX, centerY, radius.x, radius.y, 180, 90, true, iteration, pathData);
            }
        } else {
            LineTo(width, 0, pathData);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = height - radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
            } else {
                var centerX = width;
                var centerY = height;
                ArcTo(centerX, centerY, radius.x, radius.y, 270, 180, true, iteration, pathData);
            }
        } else {
            LineTo(width, height, pathData);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = height - radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
            } else {
                var centerX = 0;
                var centerY = height;
                ArcTo(centerX, centerY, radius.x, radius.y, 360, 270, true, iteration, pathData);
            }
        } else {
            LineTo(0, height, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);

        super.updateData();

        return this;
    }

    setShapeType(shapeType?: any) {
        if (typeof (shapeType) === 'string') {
            shapeType = ShapeTypeMap[shapeType];
        }

        this.shapeType = shapeType;
        return this;
    }

    setSize(width?: any, height?: any) {
        // Override Shape's setSize method
        if (height === undefined) {
            height = width;
        }
        if ((this.geom.width === width) && (this.geom.height === height)) {
            return this;
        }
        this.geom.setSize(width, height);

        if (this.shapeType === 1) {
            this.setRadius({ x: (width / 2), y: (height / 2) })
        }

        this.updateDisplayOrigin();
        this.dirty = true;

        super.setSize(width, height);
        return this;
    }

    get radius() {
        return this.geom.radius;
    }

    set radius(value) {
        this.geom.setRadius(value);
        this.updateDisplayOrigin();
        this.dirty = true;
    }

    get radiusTL() {
        return this.geom.radiusTL;
    }

    set radiusTL(value) {
        this.geom.radiusTL = value;
        this.dirty = true;
    }

    get radiusTR() {
        return this.geom.radiusTR;
    }

    set radiusTR(value) {
        this.geom.radiusTR = value;
        this.dirty = true;
    }

    get radiusBL() {
        return this.geom.radiusBL;
    }

    set radiusBL(value) {
        this.geom.radiusBL = value;
        this.dirty = true;
    }

    get radiusBR() {
        return this.geom.radiusBR;
    }

    set radiusBR(value) {
        this.geom.radiusBR = value;
        this.dirty = true;
    }

    setRadius(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    setRadiusTL(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTL = value;
        return this;
    }

    setRadiusTR(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTR = value;
        return this;
    }

    setRadiusBL(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBL = value;
        return this;
    }

    setRadiusBR(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBR = value;
        return this;
    }

    get cornerRadius() {
        return this.geom.cornerRadius;
    }

    set cornerRadius(value) {
        this.radius = value;
    }

    setCornerRadius(value?: any) {
        return this.setRadius(value);
    }

    get iteration() {
        if (this._useDynamicIteration) {
            return GetDefaultIteration(this.radius);
        }

        return this._iteration;
    }

    set iteration(value) {
        var useDynamicIteration = (value === undefined);

        // Set iteration first time
        if (this._useDynamicIteration === undefined) {
            this._useDynamicIteration = useDynamicIteration;
            this._iteration = value;
            return;
        }

        // Change iteration value
        if ((this._iteration === value) && (this._useDynamicIteration === useDynamicIteration)) {
            return;
        }

        this._useDynamicIteration = useDynamicIteration;
        this._iteration = value;
        this.dirty = true;
    }

    setIteration(iteration?: any) {
        this.iteration = iteration;
        return this;
    }

}

const ShapeTypeMap = {
    rectangle: 0,
    circle: 1
}

export default RoundRectangle;