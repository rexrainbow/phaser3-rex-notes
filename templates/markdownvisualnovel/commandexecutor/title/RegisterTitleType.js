import { TITLE } from '../../const/GameObjects.js';
import { UILayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Display from './Display.js';
import Shake from '../utils/Shake.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var RegisterTitleType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${TITLE}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${TITLE}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
        );
    }

    commandExecutor.addGameObjectManager({
        name: TITLE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: UILayer,

        commands: {
            display: Display,
            shake: Shake,
        }
    })
}

export default RegisterTitleType;