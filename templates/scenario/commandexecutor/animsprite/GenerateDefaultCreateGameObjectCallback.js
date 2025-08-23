import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

const AnimSprite = Phaser.GameObjects.Sprite;

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {}
) {

    return function (
        scene,
        config
    ) {

        var gameObject = new AnimSprite(scene);
        scene.add.existing(gameObject);

        AddViewportCoordinateProperties(gameObject, viewport);

        var { vpx = 0.5, vpy = 1 } = config;
        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;