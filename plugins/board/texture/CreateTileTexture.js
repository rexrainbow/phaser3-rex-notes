import CreatePolygonTexture from '../../utils/texture/CreatePolygonTexture.js';

var CreateTileTexture = function (board, key, fillStyle, strokeStyle, lineWidth, lineJoin) {
    if (lineJoin === undefined) {
        lineJoin = 'miter';
    }

    CreatePolygonTexture(
        board.scene,
        key,
        board.getGridPoints(0, 0, true),
        fillStyle, strokeStyle, lineWidth, lineJoin
    );
}

export default CreateTileTexture;