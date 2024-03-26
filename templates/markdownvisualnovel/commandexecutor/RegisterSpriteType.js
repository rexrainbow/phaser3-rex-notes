import { SPRITE } from '../const/GameObjects.js';
import { GOLayer } from '../const/Layers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterSpriteType = function (commandExecutor, config) {
    var createGameObjectCallback = GetValue(config, `creators.${SPRITE}`, DefaultCreateGameObjectCallback);
    if (createGameObjectCallback === false) {
        return;
    }

    commandExecutor.addGameObjectManager({
        name: SPRITE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: true,
        defaultLayer: GOLayer,

        commands: {
            cross(
                gameObject,
                {
                    key, frame
                } = {},
                commandExecutor,
                eventSheetManager, eventSheet
            ) {

                gameObject.setTexture(key, frame);
            }
        }
    })
}

var DefaultCreateGameObjectCallback = function (
    scene,
    {
        key, frame
    } = {}
) {

    return scene.add.image(0, 0, key, frame);
}

export default RegisterSpriteType;