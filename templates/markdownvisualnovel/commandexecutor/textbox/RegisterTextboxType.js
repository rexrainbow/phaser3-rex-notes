import { TEXTBOX } from '../../const/GameObjects.js';
import { UILayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Typing from './Typing.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterTextboxType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${TEXTBOX}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    } else if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${TEXTBOX}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            }
        );
    }

    commandExecutor.addGameObjectManager({
        name: TEXTBOX,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: UILayer,

        commands: {
            typing: Typing
        }
    })
}


export default RegisterTextboxType;