import DistanceBetweenPoints from '../../../utils/math/distance/DistanceBetweenPoints';

var GetEdgeLength = function(edgeGameObject?: any) {
    var nodeGameObjects = this.getNodesOfEdge(edgeGameObject);

    if (nodeGameObjects.length < 2) {
        return 0;
    }

    return DistanceBetweenPoints(nodeGameObjects[0], nodeGameObjects[1]);
};

export default GetEdgeLength;