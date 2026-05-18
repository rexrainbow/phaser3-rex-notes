import CreateBoard from './CreateBoard';
import AddLayers from './AddLayers';

var CreateBoardFromTilemap = function(tilemap?: any, layers?: any) {
    var board = CreateBoard(tilemap);
    AddLayers(board, tilemap, layers);
    return board;
}

export default CreateBoardFromTilemap;