import { BG } from '../../const/GameObjects.js';
import { BGLayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Cross from '../utils/Cross.js';
import Shake from '../utils/Shake.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var RegisterBackgroundType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${BG}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${BG}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
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
            shake: Shake,
        }
    })
}

export default RegisterBackgroundType;