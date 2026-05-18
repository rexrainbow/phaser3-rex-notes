import GetGame from '../system/GetGame';

var AddNodeConstructor = function(game?: any, name?: any, constructor?: any) {
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (!renderNodes.hasNode(name, true)) {
        renderNodes.addNodeConstructor(name, constructor);
    }
}
export default AddNodeConstructor;