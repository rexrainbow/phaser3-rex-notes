import { BG } from '../../const/GameObjects.js';
import { BGLayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Cross from './Cross.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterBackgroundType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${BG}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    } else if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${BG}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            }
        );
    }

    commandExecutor.addGameObjectManager({
        name: BG,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: BGLayer,

        commands: {
            cross: Cross,
        }
    })
}

export default RegisterBackgroundType;