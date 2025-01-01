import GetGame from '../system/GetGame.js';

var AddNodeConstructor = function (game, name, constructor) {
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (!renderNodes.hasNode(name, true)) {
        renderNodes.addNodeConstructor(name, constructor);
    }
}
export default AddNodeConstructor;