/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2022 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @ignore
 */
function P0(t?: any, p?: any) {
    var k = 1 - t;

    return k * k * k * p;
}

/**
 * @ignore
 */
function P1(t?: any, p?: any) {
    var k = 1 - t;

    return 3 * k * k * t * p;
}

/**
 * @ignore
 */
function P2(t?: any, p?: any) {
    return 3 * (1 - t) * t * t * p;
}

/**
 * @ignore
 */
function P3(t?: any, p?: any) {
    return t * t * t * p;
}

/**
 * A cubic bezier interpolation method.
 *
 * https://medium.com/@adrian_cooney/bezier-interpolation-13b68563313a
 *
 * @function Phaser.Math.Interpolation.CubicBezier
 * @since 3.0.0
 *
 * @param {number} t - The percentage of interpolation, between 0 and 1.
 * @param {number} p0 - The start point.
 * @param {number} p1 - The first control point.
 * @param {number} p2 - The second control point.
 * @param {number} p3 - The end point.
 *
 * @return {number} The interpolated value.
 */
var CubicBezierInterpolation = function(t?: any, p0?: any, p1?: any, p2?: any, p3?: any) {
    return P0(t, p0) + P1(t, p1) + P2(t, p2) + P3(t, p3);
};

export default CubicBezierInterpolation;