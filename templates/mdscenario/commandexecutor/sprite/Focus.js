import { SPRITE } from '../../const/GameObjects.js';

var Focus = function (
    gameObject,
    {
        tintOthers,
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {

    if (tintOthers === undefined) {
        tintOthers = eventSheetManager.getData('$tintOthers');
    }

    gameObject.bringMeToTop();

    commandExecutor.setGOProperty(
        {
            goType: SPRITE,
            id: gameObject.name,
            tint: 0xffffff,
        },
        eventSheetManager
    )

    commandExecutor.setGOProperty(
        {
            goType: SPRITE,
            id: '!' + gameObject.name,
            tint: tintOthers,
        },
        eventSheetManager
    )
}

export default Focus;