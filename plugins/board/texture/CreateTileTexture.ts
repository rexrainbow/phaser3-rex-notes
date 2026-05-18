import CreatePolygonTexture from '../../utils/texture/CreatePolygonTexture';

var CreateTileTexture = function(board?: any, key?: any, fillStyle?: any, strokeStyle?: any, lineWidth?: any, overlapGrid?: any, lineJoin?: any) {
    if (typeof (overlapGrid) === 'string') {
        lineJoin = overlapGrid;
        overlapGrid = undefined;
    }

    if (overlapGrid === undefined) {
        overlapGrid = true;
    }
    if (lineJoin === undefined) {
        lineJoin = 'miter';
    }

    CreatePolygonTexture(
        board.scene,
        key,
        board.getGridPoints(0, 0, true),
        fillStyle,
        strokeStyle, lineWidth,
        overlapGrid,
        lineJoin
    );
}

export default CreateTileTexture;