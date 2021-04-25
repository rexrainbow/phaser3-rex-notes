import MakeChildImageGameObject from '../../../../utils/rendertexture/MakeChildImageGameObject.js';

var UpdateTexture = function () {
    this.clear();

    if (this.textureKey === undefined) {
        return this;
    }
    var texture = this.scene.textures.get(this.textureKey);
    if (!texture) {
        return this;
    }

    var stretchWidth = this.width - this.columns.minWidth;
    var proportionWidth, fixedPartScaleX;
    if (stretchWidth >= 0) {
        proportionWidth = (this.columns.stretch > 0) ? (stretchWidth / this.columns.stretch) : 0;
        fixedPartScaleX = 1;
    } else {
        proportionWidth = 0;
        fixedPartScaleX = (this.width / this.columns.minWidth);
    }

    var stretchHeight = this.height - this.rows.minHeight;
    var proportionHeight, fixedPartScaleY;
    if (stretchHeight >= 0) {
        proportionHeight = (this.rows.stretch > 0) ? (stretchHeight / this.rows.stretch) : 0;
        fixedPartScaleY = 1;
    } else {
        proportionHeight = 0;
        fixedPartScaleY = (this.height / this.rows.minHeight);
    }

    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0, offsetY = 0;
    var gameObject, imageType;
    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
        row = this.rows.data[j];
        rowHeight = (row.stretch === 0) ? (row.height * fixedPartScaleY) : (proportionHeight * row.stretch);

        offsetX = 0;
        for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
            col = this.columns.data[i];
            colWidth = (col.stretch === 0) ? (col.width * fixedPartScaleX) : (proportionWidth * col.stretch);

            frameName = this.getFrameNameCallback(i, j, this.baseFrameName);
            if (frameName && (colWidth > 0) && (rowHeight > 0) && texture.has(frameName)) {
                if ((row.stretch === 0) && (col.stretch === 0)) { // Fixed parts
                    imageType = 0; // Draw image
                } else { // Stretchable parts
                    if (this.getStretchMode(i, j) === 0) { // Scaled image
                        imageType = 0; // Draw scaled image
                    } else { // Repeat tile-sprite
                        imageType = 1; // Draw tile-sprite
                    }
                }

                if (imageType === 0) {
                    gameObject = MakeChildImageGameObject(this, '_image', 'image');
                    gameObject
                        .setTexture(this.textureKey, frameName)
                        .setDisplaySize(colWidth, rowHeight);
                } else {
                    gameObject = MakeChildImageGameObject(this, '_tileSprite', 'tileSprite');
                    gameObject
                        .setTexture(this.textureKey, frameName)
                        .setSize(colWidth, rowHeight);
                }
            }

            if (gameObject) {
                this.draw(gameObject, offsetX, offsetY);
                gameObject = undefined;
            }
            offsetX += colWidth;
        }

        offsetY += rowHeight;
    }
}

export default UpdateTexture;