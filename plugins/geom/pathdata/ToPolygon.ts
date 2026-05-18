import { Geom as PhaserGeom } from 'phaser';
//import Polygon from '../../utils/geom/polygon/Polygon';

const Polygon = PhaserGeom.Polygon;

var ToPolygon = function(pathData?: any, polygon?: any) {
    if (polygon === undefined) {
        polygon = new Polygon();
    }
    polygon.setTo(pathData);
    return polygon;
}

export default ToPolygon;