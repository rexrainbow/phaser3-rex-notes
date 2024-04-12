import { SPRITE } from '../../const/GameObjects.js';

var Focus = function (
    gameObject,
    {
        tintOthers = 0x000000,
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    gameObject.bringMeToTop();
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