import GetGame from '../../system/GetGame.js';

var RegisterFilter = function (game, FilterClass) {
    var filterName = FilterClass.FilterName;
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (renderNodes.hasNode(filterName)) {
        return;
    }

    renderNodes.addNodeConstructor(filterName, FilterClass);
}

export default RegisterFilter;