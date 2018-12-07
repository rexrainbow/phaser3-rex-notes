import Base from './Quad-loigc.js';
import GetGridPolygon from './GetGridPolygon.js';

class QuadGrid extends Base {}

var methods = {
    getGridPolygon: GetGridPolygon
}
Object.assign(
    QuadGrid.prototype,
    methods
);

export default QuadGrid;