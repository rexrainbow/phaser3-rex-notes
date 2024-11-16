/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import CircumferencePoint from './CircumferencePoint.js';
import FromPercent from '../../math/FromPercent.js';
import Point from '../point/Point.js';

/**
 * Returns a Point object containing the coordinates of a point on the circumference of the Ellipse
 * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
 * at 180 degrees around the circle.
 *
 * @function Phaser.Geom.Ellipse.GetPoint
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Point} O - [out,$return]
 *
 * @param {Phaser.Geom.Ellipse} ellipse - The Ellipse to get the circumference point on.
 * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the ellipse.
 * @param {(Phaser.Geom.Point|object)} [out] - An object to store the return values in. If not given a Point object will be created.
 *
 * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point around the ellipse.
 */
var GetPoint = function (ellipse, position, out) {
    if (out === undefined) { out = new Point(); }

    var angle = FromPercent(position, 0, Math.PI * 2);

    return CircumferencePoint(ellipse, angle, out);
};

export default GetPoint;
