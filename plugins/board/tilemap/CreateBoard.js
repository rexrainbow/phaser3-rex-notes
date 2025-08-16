import Board from '../board/Board.js';

var CreateBoard = function (tilemap) {
    var board = new Board(tilemap.scene, {
        grid: CreateGridConfig(tilemap),
        width: tilemap.width,
        height: tilemap.height
    })

    return board;
}

var CreateGridConfig = function (tilemap) {
    var grid = {
        cellWidth: tilemap.tileWidth,
        cellHeight: tilemap.tileHeight,
    }

    var gridOffsetX, gridOffsetY;
    switch (tilemap.orientation) {
        case 0:    // ORTHOGONAL
            grid.gridType = 'quadGrid';
            grid.type = 'orthogonal';
            gridOffsetX = 0;
            gridOffsetY = 0;
            break;

        case 1:    // ISOMETRIC
            grid.gridType = 'quadGrid';
            grid.type = 'isometric';
            gridOffsetX = tilemap.tileWidth * 0.5;
            gridOffsetY = tilemap.tileHeight * 1.5;
            break;

        case 3:    // HEXAGONAL
            grid.gridType = 'hexagonGrid';
            grid.staggeraxis = 'y';
            grid.staggerindex = 'odd';
            gridOffsetX = 0;
            gridOffsetY = 0;
            break;

        default:   // ORTHOGONAL
            grid.gridType = 'quadGrid';
            grid.type = 'orthogonal';
            gridOffsetX = 0;
            gridOffsetY = 0;
            break;
    }

    var layer = tilemap.layers[0];
    if (layer) {
        grid.x = layer.x + gridOffsetX;
        grid.y = layer.y + gridOffsetY;
    }

    return grid;
}

export default CreateBoard;