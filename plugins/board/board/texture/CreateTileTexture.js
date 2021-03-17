import CreatePolygonTexture from '../../../utils/texture/CreatePolygonTexture.js';

var CreateTileTexture = function (key, fillStyle, strokeStyle, lineWidth, lineJoin) {
    if (lineJoin === undefined) {
        lineJoin = 'miter';
    }
    CreatePolygonTexture(this.scene, key, this.getGridPoints(), fillStyle, strokeStyle, lineWidth, lineJoin);
    return this;
}

export default CreateTileTexture;