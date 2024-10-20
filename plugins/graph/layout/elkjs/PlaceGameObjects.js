import AlignIn from '../../../utils/actions/AlignIn.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var PlaceGameObjects = function (graphData, graph) {
    graphData.children.forEach(function (nodeData) {
        AlignIn(nodeData.gameObject, nodeData.x, nodeData.y, nodeData.width, nodeData.height, ALIGN_CENTER);
    })

    // TODO: edge?
}

export default PlaceGameObjects;