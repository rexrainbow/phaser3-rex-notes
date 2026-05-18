import { SPRITE } from '../../const/GameObjects';
import { GOLayer } from '../../const/Layers';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback';
import Cross from './Cross';
import Focus from './Focus';
import Unfocus from './Unfocus';
import Say from './Say';
import Shake from '../utils/Shake';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var RegisterSpriteType = function(commandExecutor?: any, config?: any) {
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