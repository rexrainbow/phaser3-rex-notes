import { CHOICE } from '../../const/GameObjects';
import { UILayer } from '../../const/Layers';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback';
import Choice from './Choice';
import Shake from '../utils/Shake';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var RegisterChoiceDialogType = function(commandExecutor?: any, config?: any) {
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