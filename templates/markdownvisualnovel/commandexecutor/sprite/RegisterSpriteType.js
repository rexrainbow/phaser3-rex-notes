import { SPRITE } from '../../const/GameObjects.js';
import { GOLayer } from '../../const/Layers.js';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback.js';
import Cross from './Cross.js';
import Focus from './Focus.js';
import Unfocus from './Unfocus.js';
import Say from './Say.js';
import Shake from '../utils/Shake.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var RegisterSpriteType = function (commandExecutor, config) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${SPRITE}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${SPRITE}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
        );
    }

    commandExecutor.addGameObjectManager({
        name: SPRITE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: GOLayer,

        commands: {
            cross: Cross,
            focus: Focus,
            unfocus: Unfocus,
            say: Say,
            shake: Shake
        }
    })
}

export default RegisterSpriteType;