import GetGame from '../../system/GetGame';

var RegisterFilter = function(game?: any, FilterClass?: any) {
    var filterName = FilterClass.FilterName;
    var renderNodes = GetGame(game).renderer.renderNodes;
    if (renderNodes.hasNode(filterName)) {
        return false;
    }

    renderNodes.addNodeConstructor(filterName, FilterClass);
    return true;
}

export default RegisterFilter;