import PathBase from './PathBase';
import PathDataBuilder from '../../../../../geom/pathdata/PathDataBuilder/PathDataBuilder';

class Lines extends PathBase {
    builder: any;
    closePath: any;
    dirty: any;
    pathData: any;

    constructor() {
        super();
        this.builder = new PathDataBuilder(this.pathData);
    }

    get iterations() {
        return this.builder.iterations;
    }

    set iterations(value) {
        this.dirty = this.dirty || (this.builder.iterations !== value);
        this.builder.setIterations(value);
    }

    setIterations(iterations?: any) {
        this.iterations = iterations;
        return this;
    }

    setPathTypeMismatchWarningEnable(enable?: any) {
        this.builder.setPathTypeMismatchWarningEnable(enable);
        return this;
    }

    get lastPointX() {
        return this.builder.lastPointX;
    }

    get lastPointY() {
        return this.builder.lastPointY;
    }

    start() {
        this.builder.start();

        this.dirty = true;
        return this;
    }

    startAt(x?: any, y?: any) {
        this.builder.startAt(x, y);

        this.dirty = true;
        return this;
    }

    lineTo(x?: any, y?: any, relative?: any) {
        this.builder.lineTo(x, y, relative);

        this.dirty = true;
        return this;
    }

    verticalLineTo(x?: any, relative?: any) {
        this.builder.verticalLineTo(x, relative);

        this.dirty = true;
        return this;
    }

    horizontalLineTo(y?: any, relative?: any) {
        this.builder.horizontalLineTo(y, relative);

        this.dirty = true;
        return this;
    }

    ellipticalArc(centerX?: any, centerY?: any, radiusX?: any, radiusY?: any, startAngle?: any, endAngle?: any, anticlockwise?: any) {
        this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);

        this.dirty = true;
        return this;
    }

    arc(centerX?: any, centerY?: any, radius?: any, startAngle?: any, endAngle?: any, anticlockwise?: any) {
        this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        this.dirty = true;
        return this;
    }

    quadraticBezierTo(cx?: any, cy?: any, x?: any, y?: any) {
        this.builder.quadraticBezierTo(cx, cy, x, y);

        this.dirty = true;
        return this;
    }

    smoothQuadraticBezierTo(x?: any, y?: any) {
        this.builder.smoothQuadraticBezierTo(x, y);

        this.dirty = true;
        return this;
    }

    cubicBezierTo(cx0?: any, cy0?: any, cx1?: any, cy1?: any, x?: any, y?: any) {
        this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

        this.dirty = true;
        return this;
    }

    smoothCubicBezierTo(cx1?: any, cy1?: any, x?: any, y?: any) {
        this.builder.smoothCubicBezierTo(cx1, cy1, x, y);

        this.dirty = true;
        return this;
    }

    catmullRomTo(...points) {
        this.builder.catmullRomTo(...points);

        this.dirty = true;
        return this;
    }

    close() {
        this.builder.close();

        this.closePath = this.builder.closePath;
        this.dirty = true;
        return this;
    }

    end() {
        this.builder.end();
        this.dirty = true;
        return this;
    }

    rotateAround(centerX?: any, centerY?: any, angle?: any) {
        this.builder.rotateAround(centerX, centerY, angle);

        this.dirty = true;
        return this;
    }

    scale(centerX?: any, centerY?: any, scaleX?: any, scaleY?: any) {
        this.builder.scale(centerX, centerY, scaleX, scaleY);

        this.dirty = true;
        return this;
    }

    offset(x?: any, y?: any) {
        this.builder.offset(x, y);

        this.dirty = true;
        return this;
    }

    toPolygon(polygon?: any) {
        return this.builder.toPolygon(polygon);
    }

    appendPathFrom(src?: any, startT?: any, endT?: any) {
        this.builder.appendFromPathSegment(src.builder, startT, endT);
        return this;
    }

    copyPathFrom(src?: any, startT?: any, endT?: any) {
        this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
        return this;
    }

    setDisplayPathSegment(startT?: any, endT?: any) {
        this.builder.setDisplayPathSegment(startT, endT);
        return this;
    }
}

export default Lines;