// Copy from Phaser.GameObjects.GameObject class
var WillRoundVertices = function (camera, onlyTranslated) {
    switch (this.vertexRoundMode) {
        case 'safe':
            return onlyTranslated;

        case 'safeAuto':
            return onlyTranslated && camera.roundPixels;

        case 'full':
            return true;

        case 'fullAuto':
            return camera.roundPixels;

        case 'off':
        default:
            return false;
    }
};

var LayerGameObjectClassPatch = function (gameObject) {
    var proto = Object.getPrototypeOf(gameObject);
    if (proto.willRoundVertices) {
        return;
    }

    Object.assign(
        proto,
        {
            willRoundVertices: WillRoundVertices,
        }
    )
}

export default LayerGameObjectClassPatch;