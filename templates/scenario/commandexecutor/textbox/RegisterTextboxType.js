import { TEXTBOX } from '../../const/GameObjects.js';
import { UILayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Typing from './Typing.js';
import Shake from '../utils/Shake.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var RegisterTextboxType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${TEXTBOX}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${TEXTBOX}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
        );
    }

    commandExecutor.addGameObjectManager({
        name: TEXTBOX,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: UILayer,

        commands: {
            typing: Typing,
            shake: Shake,
        }
    })
}


export default RegisterTextboxType;