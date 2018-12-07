import Base from './Hexagon-logic.js';
import GetGridPolygon from './GetGridPolygon.js';

class HexagonGrid extends Base {}

var methods = {
    getGridPolygon: GetGridPolygon,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;