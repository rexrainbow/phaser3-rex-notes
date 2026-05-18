import RenderBase from '../renderbase/RenderBase';
import GetStyle from '../../../../../utils/canvas/GetStyle';
import GetProperty from '../utils/GetProperty';
import DrawRoundRectangleBackground from '../../../../canvas/utils/DrawRoundRectangleBackground';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Background extends RenderBase {
    _color: any;
    _color2: any;
    _cornerIteration: any;
    _cornerRadius: any;
    _horizontalGradient: any;
    _stroke: any;
    _strokeThickness: any;
    canvas: any;
    context: any;
    parent: any;
    setDirty: any;
    setScrollFactor: any;

    constructor(parent?: any, config?: any) {
        super(parent, 'background');

        this.setScrollFactor(0);

        this.setColor(
            GetValue(config, 'color', null),
            GetValue(config, 'color2', null),
            GetValue(config, 'horizontalGradient', true)
        );

        this.setStroke(
            GetValue(config, 'stroke', null),
            GetValue(config, 'strokeThickness', 2)
        );

        this.setCornerRadius(
            GetValue(config, 'cornerRadius', 0),
            GetValue(config, 'cornerIteration', null)
        );
    }

    set color(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
    }

    get color() {
        return this._color;
    }

    set color2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
    }

    get color2() {
        return this._color2;
    }

    set horizontalGradient(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
    }

    get horizontalGradient() {
        return this._horizontalGradient;
    }

    setColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
    }

    set stroke(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
    }

    get stroke() {
        return this._stroke;
    }

    set strokeThickness(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
    }

    get strokeThickness() {
        return this._strokeThickness;
    }

    setStroke(color?: any, lineWidth?: any) {
        if (color != null) {
            if (lineWidth === undefined) {
                lineWidth = 2;
            }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
    }

    set cornerRadius(value) {
        this.setDirty(this._cornerRadius != value);
        this._cornerRadius = value;
    }

    get cornerRadius() {
        return this._cornerRadius;
    }

    set cornerIteration(value) {
        this.setDirty(this._cornerIteration != value);
        this._cornerIteration = value;
    }

    get cornerIteration() {
        return this._cornerIteration;
    }

    modifyStyle(o?: any) {
        if (o.hasOwnProperty('color')) {
            this.setColor(
                o.color,
                GetProperty('color2', o, this),
                GetProperty('horizontalGradient', o, this),
            );
        }
        if (o.hasOwnProperty('stroke')) {
            this.setStroke(
                o.stroke,
                GetProperty('strokeThickness', o, this),
            );
        }
        if (o.hasOwnProperty('cornerRadius')) {
            this.setCornerRadius(
                o.cornerRadius,
                GetProperty('cornerIteration', o, this),
            );
        }

        return this;
    }

    modifyPorperties(o?: any) {
        super.modifyPorperties(o);

        this.modifyStyle(o);

        return this;
    }

    setCornerRadius(radius?: any, iteration?: any) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
    }

    renderContent() {
        DrawRoundRectangleBackground(
            this.parent,
            this.color,
            this.stroke,
            this.strokeThickness,
            this.cornerRadius,
            this.color2,
            this.horizontalGradient,
            this.cornerIteration
        );
    }
}

export default Background;