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

    return k * k * p;
}

/**
 * @ignore
 */
function P1(t?: any, p?: any) {
    return 2 * (1 - t) * t * p;
}

/**
 * @ignore
 */
function P2(t?: any, p?: any) {
    return t * t * p;
}

// https://github.com/mrdoob/three.js/blob/master/src/extras/core/Interpolations.js

/**
 * A quadratic bezier interpolation method.
 *
 * @function Phaser.Math.Interpolation.QuadraticBezier
 * @since 3.2.0
 *
 * @param {number} t - The percentage of interpolation, between 0 and 1.
 * @param {number} p0 - The start point.
 * @param {number} p1 - The control point.
 * @param {number} p2 - The end point.
 *
 * @return {number} The interpolated value.
 */
var QuadraticBezierInterpolation = function(t?: any, p0?: any, p1?: any, p2?: any) {
    return P0(t, p0) + P1(t, p1) + P2(t, p2);
};

export default QuadraticBezierInterpolation;