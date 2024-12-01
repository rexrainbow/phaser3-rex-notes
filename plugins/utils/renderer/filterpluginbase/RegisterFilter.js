import GetGame from '../../system/GetGame.js';

var RegisterPostPipeline = function (game, FilterClass) {
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (renderNodes.hasNode(FilterClass.FilterName)) {
        return;
    }

    renderNodes.addNodeConstructor(FilterClass.FilterName, FilterClass);
}

export default RegisterPostPipeline;