import UidToObj from '../../graphitem/UidToObj.js';
import DistanceBetween from '../../../utils/math/distance/DistanceBetween.js';

var GetEdgeLength = function (gameObejct) {
    var edge = this.getEdgeData(gameObejct);
    if (!edge) {
        return 0;
    }
    var nodeAGO = UidToObj(edge.vA);
    var nodeBGO = UidToObj(edge.vB);
    if ((!nodeAGO) || (!nodeBGO)) {
        return 0;
    }

    return DistanceBetween(nodeAGO.x, nodeAGO.y, nodeBGO.x, nodeBGO.y);
};

export default GetEdgeLength;