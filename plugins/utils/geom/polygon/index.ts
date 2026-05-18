/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Polygon from './Polygon';
import Clone from './Clone';
import Contains from './Contains';
import ContainsPoint from './ContainsPoint';
import GetAABB from './GetAABB';
import GetNumberArray from './GetNumberArray';
import GetPoints from './GetPoints';
import Perimeter from './Perimeter';
import Reverse from './Reverse';
import Smooth from './Smooth';

Polygon.Clone = Clone;
Polygon.Contains = Contains;
Polygon.ContainsPoint = ContainsPoint;
Polygon.GetAABB = GetAABB;
Polygon.GetNumberArray = GetNumberArray;
Polygon.GetPoints = GetPoints;
Polygon.Perimeter = Perimeter;
Polygon.Reverse = Reverse;
Polygon.Smooth = Smooth;

export default Polygon;