import { TEXTBOX } from '../../const/GameObjects.js'
import Cross from './Cross.js';
import Focus from './Focus.js';
import Typing from '../textbox/Typing.js';

var Say = function (
    gameObject,
    {
        key, frame,
        name, expression,
        duration, mode = 'crossFade',
        tintOthers,
        text,
        more = false,
        displayName,
        typingSpeed,
        icon, iconFrame,
        iconCrossDuration, iconCrossMode = 'crossFade',
        waitIconAnimationMode,
        clickAfterComplete = true,
        wait = true
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {

    Cross(
        gameObject,
        {
            key, frame,
            name, expression,
            duration, mode,
            wait: false
        },
        commandExecutor, eventSheetManager, eventSheet
    );

    Focus(
        gameObject,
        {
            tintOthers
        },
        commandExecutor, eventSheetManager, eventSheet
    );

    var textbox = commandExecutor.sys.getGameObject(TEXTBOX, undefined)[0];
    if (textbox) {
        Typing(
            textbox,
            {
                text,
                displayName,
                icon, iconFrame,
                name, expression,
                typingSpeed,
                iconCrossDuration, iconCrossMode,
                more,
                waitIconAnimationMode,
                clickAfterComplete,
                wait
            },
            commandExecutor, eventSheetManager, eventSheet
        );
    }

}

export default Say;