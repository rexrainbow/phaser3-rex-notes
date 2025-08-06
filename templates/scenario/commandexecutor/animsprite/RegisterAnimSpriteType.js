import { ANIMSPRITE } from '../../const/GameObjects.js';
import { GOLayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterAnimSpriteType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${ANIMSPRITE}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    } else if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${ANIMSPRITE}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            }
        );
    }

    commandExecutor.addGameObjectManager({
        name: ANIMSPRITE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: GOLayer,

        commands: {
        }
    })
}

export default RegisterAnimSpriteType;