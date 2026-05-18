import { NAMEINPUT } from '../../const/GameObjects';
import { UILayer } from '../../const/Layers';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback';
import NameInput from './NameInput';
import Shake from '../utils/Shake';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var RegisterNameInputDialogType = function(commandExecutor?: any, config?: any) {
    var { viewport } = config;
    var createGameObjectCallback = GetValue(config, `creators.${NAMEINPUT}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    }

    var creators;
    if (IsPlainObject(createGameObjectCallback)) {
        creators = createGameObjectCallback;
        createGameObjectCallback = undefined;
    }

    if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${NAMEINPUT}`, {});
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(
            style,
            {
                viewport
            },
            creators
        );
    }

    commandExecutor.addGameObjectManager({
        name: NAMEINPUT,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: { viewport },
        defaultLayer: UILayer,

        commands: {
            input: NameInput,
            shake: Shake,
        }
    })
}




export default RegisterNameInputDialogType;