import PathBase from "./PathBase";

/**
 * Polyline path geometry.
 */
export default class Lines extends PathBase {
    /**
     * Set iteration count.
     * @param iterations - Iteration count.
     * @returns This instance.
     */
    setIterations(iterations: number): this;
    /**
     * Iteration count.
     */
    iterations: number;

    /**
     * First point x.
     */
    firstPointX: number;
    /**
     * First point y.
     */
    firstPointY: number;
    /**
     * Last point x.
     */
    lastPointX: number;
    /**
     * Last point y.
     */
    lastPointY: number;

    /**
     * Start a new path at a point.
     * @param x - Start x.
     * @param y - Start y.
     * @returns This instance.
     */
    startAt(x: number, y: number): this;

    /**
     * Add a line segment.
     * @param x - Target x.
     * @param y - Target y.
     * @param relative - True for relative.
     * @returns This instance.
     */
    lineTo(x: number, y: number, relative?: boolean): this;
    /**
     * Add a vertical line.
     * @param x - Target x.
     * @param relative - True for relative.
     * @returns This instance.
     */
    verticalLineTo(x: number, relative?: boolean): this;
    /**
     * Add a horizontal line.
     * @param y - Target y.
     * @param relative - True for relative.
     * @returns This instance.
     */
    horizontalLineTo(y: number, relative?: boolean): this;

    /**
     * Add an elliptical arc segment.
     */
    ellipticalArc(
        centerX: number, centerY: number,
        radiusX: number, radiusY: number,
        startAngle: number, endAngle: number,
        anticlockwise?: boolean
    ): this;
    /**
     * Add an arc segment.
     */
    arc(
        centerX: number, centerY: number,
        radius: number,
        startAngle: number, endAngle: number,
        anticlockwise?: boolean
    ): this;

    /**
     * Add a quadratic bezier segment.
     */
    quadraticBezierTo(
        cx: number, cy: number,
        x: number, y: number
    ): this;

    /**
     * Add a cubic bezier segment.
     */
    cubicBezierTo(
        cx0: number, cy0: number,
        cx1: number, cy1: number,
        x: number, y: number
    ): this;

    /**
     * Add a catmull-rom segment.
     * @param points - Control points.
     * @returns This instance.
     */
    catmullRomTo(...points: number[]): this;

    /**
     * Close the path.
     * @returns This instance.
     */
    close(): this;

    /**
     * End the path.
     * @returns This instance.
     */
    end(): this;

    /**
     * Rotate around a point.
     * @param centerX - Center x.
     * @param centerY - Center y.
     * @param angle - Angle in radians.
     * @returns This instance.
     */
    rotateAround(
        centerX: number, centerY: number,
        angle: number
    ): this;

    /**
     * Scale around a point.
     * @param centerX - Center x.
     * @param centerY - Center y.
     * @param scaleX - Scale x.
     * @param scaleY - Scale y.
     * @returns This instance.
     */
    scale(
        centerX: number, centerY: number,
        scaleX: number, scaleY: number
    ): this;

    /**
     * Offset all points.
     * @param x - Offset x.
     * @param y - Offset y.
     * @returns This instance.
     */
    offset(x: number, y: number): this;

    /**
     * Save current path data.
     * @returns This instance.
     */
    savePathData(): this;
    /**
     * Restore saved path data.
     * @returns This instance.
     */
    restorePathData(): this;

    /**
     * Append path from another.
     * @param src - Source path.
     * @returns This instance.
     */
    appendPathFrom(src: Lines): this;
    /**
     * Append path from another to endT.
     * @param src - Source path.
     * @param endT - End t.
     * @returns This instance.
     */
    appendPathFrom(src: Lines, endT: number): this;
    /**
     * Append path from another between t range.
     * @param src - Source path.
     * @param startT - Start t.
     * @param endT - End t.
     * @returns This instance.
     */
    appendPathFrom(src: Lines, startT: number, endT: number): this;

    /**
     * Copy path from another.
     * @param src - Source path.
     * @returns This instance.
     */
    copyPathFrom(src: Lines): this;
    /**
     * Copy path from another to endT.
     * @param src - Source path.
     * @param endT - End t.
     * @returns This instance.
     */
    copyPathFrom(src: Lines, endT: number): this;
    /**
     * Copy path from another between t range.
     * @param src - Source path.
     * @param startT - Start t.
     * @param endT - End t.
     * @returns This instance.
     */
    copyPathFrom(src: Lines, startT: number, endT: number): this;

    /**
     * Set display path segment.
     * @param endT - End t.
     * @returns This instance.
     */
    setDisplayPathSegment(endT: number): this;
    /**
     * Set display path segment by range.
     * @param startT - Start t.
     * @param endT - End t.
     * @returns This instance.
     */
    setDisplayPathSegment(startT: number, endT: number): this;
}
