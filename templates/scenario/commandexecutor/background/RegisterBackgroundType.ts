import { BG } from '../../const/GameObjects';
import { BGLayer } from '../../const/Layers';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback';
import Cross from '../utils/Cross';
import Shake from '../utils/Shake';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var RegisterBackgroundType = function(commandExecutor?: any, config?: any) {
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