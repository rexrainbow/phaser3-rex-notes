import { CHOICE } from '../../const/GameObjects.js';
import { UILayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Choice from './Choice.js';
import Shake from '../utils/Shake.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var RegisterChoiceDialogType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${CHOICE}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${CHOICE}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
        );
    }

    commandExecutor.addGameObjectManager({
        name: CHOICE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: UILayer,

        commands: {
            choice: Choice,
            shake: Shake,
        }
    })
}




export default RegisterChoiceDialogType;