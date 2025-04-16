import GetGame from '../../system/GetGame.js';

var RegisterFilter = function (game, FilterClass) {
    var filterName = FilterClass.FilterName;
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (renderNodes.hasNode(filterName)) {
        return false;
    }

    renderNodes.addNodeConstructor(filterName, FilterClass);
    return true;
}

export default RegisterFilter;