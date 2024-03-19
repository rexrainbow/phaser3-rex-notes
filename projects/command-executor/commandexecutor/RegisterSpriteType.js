import { SPRITE, GOLayer } from './Const.js';

var RegisterSpriteType = function (commandExecutor) {
    commandExecutor.addGameObjectManager({
        name: SPRITE,
        createGameObject(scene, { key, frame } = {}) {
            return scene.add.image(0, 0, key, frame);
        },
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
                eventSheetManager
            ) {

                gameObject.setTexture(key, frame);
            }
        }
    })
}

export default RegisterSpriteType;