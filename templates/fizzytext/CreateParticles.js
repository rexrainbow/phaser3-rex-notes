var CreateParticles = function (fizzyText, config) {
    var scene = fizzyText.scene;
    var textureKey = config.textureKey;
    var particles = scene.add.particles(textureKey);
    particles.createEmitter({
        blendMode: 'ADD',
        scale: 0.1,
        quantity: 8,
        emitZone: {
            type: 'random',
            source: {
                getRandomPoint: GetRandomPointCallback(fizzyText)
            }
        }
    })

    return particles;
}

const GetRandom = Phaser.Utils.Array.GetRandom;
var GetRandomPointCallback = function (fizzyText) {
    var textBitmapList = fizzyText.textBitmapList;
    var textObject = fizzyText.textObject;
    return function (point) {
        if (textBitmapList.length > 0) {
            var p = GetRandom(textBitmapList).split(',');
            point.x = p[0] - textObject.displayOriginX;
            point.y = p[1] - textObject.displayOriginY;
        }

        return point;
    }
}

export default CreateParticles;