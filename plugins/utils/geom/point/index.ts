/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Point from './Point';
import Ceil from './Ceil';
import Clone from './Clone';
import CopyFrom from './CopyFrom';
import Equals from './Equals';
import Floor from './Floor';
import GetCentroid from './GetCentroid';
import GetMagnitude from './GetMagnitude';
import GetMagnitudeSq from './GetMagnitudeSq';
import GetRectangleFromPoints from './GetRectangleFromPoints';
import Interpolate from './Interpolate';
import Invert from './Invert';
import Negative from './Negative';
import Project from './Project';
import ProjectUnit from './ProjectUnit';
import SetMagnitude from './SetMagnitude';

Point.Ceil = Ceil;
Point.Clone = Clone;
Point.CopyFrom = CopyFrom;
Point.Equals = Equals;
Point.Floor = Floor;
Point.GetCentroid = GetCentroid;
Point.GetMagnitude = GetMagnitude;
Point.GetMagnitudeSq = GetMagnitudeSq;
Point.GetRectangleFromPoints = GetRectangleFromPoints;
Point.Interpolate = Interpolate;
Point.Invert = Invert;
Point.Negative = Negative;
Point.Project = Project;
Point.ProjectUnit = ProjectUnit;
Point.SetMagnitude = SetMagnitude;

export default Point;