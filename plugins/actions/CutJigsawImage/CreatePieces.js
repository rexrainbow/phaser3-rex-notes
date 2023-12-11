import GenerateFrames from './generateframes/GenerateFrames.js';

const DefaultImageClass = Phaser.GameObjects.Image;
const RotateAround = Phaser.Math.RotateAround;

var CreatePieces = function (gameObject, {
    piecesKey,
    columns, rows,
    edgeWidth, edgeHeight,
    drawShapeCallback,
    edges,
    useDynamicTexture = true,

    createImageCallback,
    ImageClass = DefaultImageClass,
    objectPool,
    add = true,
    align = add,

    originX = 0.5,
    originY = 0.5,
}) {

    var scene = gameObject.scene;

    var sourceKey = gameObject.texture.key;
    var topLeft = gameObject.getTopLeft()
    var topLeftX = topLeft.x;
    var topLeftY = topLeft.y;
    var scaleX = gameObject.scaleX;
    var scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;

    var result = GenerateFrames(scene, {
        sourceKey,
        destinationKey: piecesKey,
        columns, rows,
        edgeWidth, edgeHeight,
        edges,
        drawShapeCallback,
        useDynamicTexture,
    })

    piecesKey = result.destinationKey;
    var getFrameNameCallback = result.getFrameNameCallback;
    var frameWidth = result.frameWidth,
        frameHeight = result.frameHeight;
    var pieceWidth = (frameWidth - (edgeWidth * 2)) * scaleX,
        pieceHeight = (frameHeight - (edgeHeight * 2)) * scaleY;
    var pieceDisplayOriginX = originX * frameWidth * scaleX,
        pieceDisplayOriginY = originY * frameHeight * scaleY;

    if (!createImageCallback) {
        createImageCallback = function (scene, key, frame) {
            return new ImageClass(scene, 0, 0, key, frame);
        }
    }

    var pieceGameObjects = [];

    topLeftX -= edgeWidth;
    topLeftY -= edgeHeight;
    var pieceTopLeftX = topLeftX,
        pieceTopLeftY = topLeftY;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var pieceGameObject;
            var frameName = getFrameNameCallback(c, r);

            if (objectPool && (objectPool.length > 0)) {
                pieceGameObject = (objectPool.pop()).setTexture(piecesKey, frameName);
            } else {
                pieceGameObject = createImageCallback(scene, piecesKey, frameName);
            }

            if (add) {
                scene.add.existing(pieceGameObject);
            }

            if (align) {
                var pieceX = pieceTopLeftX + pieceDisplayOriginX;
                var pieceY = pieceTopLeftY + pieceDisplayOriginY;
                pieceGameObject
                    .setOrigin(originX, originY)
                    .setPosition(pieceX, pieceY)
                    .setScale(scaleX, scaleY)
                    .setRotation(rotation);
                RotateAround(pieceGameObject, topLeftX, topLeftY, rotation);
            }

            pieceTopLeftX += pieceWidth;

            pieceGameObjects.push(pieceGameObject);
        }

        pieceTopLeftX = topLeftX;
        pieceTopLeftY += pieceHeight;

    }

    return pieceGameObjects;
}

export default CreatePieces;