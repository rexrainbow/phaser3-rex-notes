import Board from '../board/board.js';

var BuildBoard = function (tilemap) {
    var grid = {
        cellWidth: tilemap.tileWidth,
        cellHeight: tilemap.cellHeight,
    }

    switch (tilemap.orientation) {
        case 0:    // ORTHOGONAL
            grid.gridType = 'quadGrid';
            grid.type = 'orthogonal';
            break;

        case 1:    // ISOMETRIC
            grid.gridType = 'quadGrid';
            grid.type = 'isometric';
            break;

        case 3:    // HEXAGONAL
            grid.gridType = 'hexagonGrid';
            grid.staggeraxis = 'y';
            grid.staggerindex = 'odd';
            break;

        default:   // ORTHOGONAL
            grid.gridType = 'quadGrid';
            grid.type = 'orthogonal';
            break;
    }

    var board = new Board(tilemap.scene, {
        grid: grid,
        width: tilemap.width,
        height: tilemap.height
    })

    return board;
}

export default BuildBoard;