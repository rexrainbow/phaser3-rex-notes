import { TITLE } from '../../const/GameObjects';
import { UILayer } from '../../const/Layers';
import GenerateDefaultCreateGameObjectCallback from './GenerateDefaultCreateGameObjectCallback';
import SetText from './SetText';
import PopUp from './Popup';
import Shake from '../utils/Shake';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var RegisterTitleType = function(commandExecutor?: any, config?: any) {
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
            setText: SetText,
            popUp: PopUp,
            shake: Shake,
        }
    })
}

export default RegisterTitleType;