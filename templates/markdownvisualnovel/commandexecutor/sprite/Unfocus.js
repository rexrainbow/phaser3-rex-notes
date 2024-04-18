import { SPRITE } from '../../const/GameObjects.js';

var Focus = function (
    gameObject,
    config,
    commandExecutor, eventSheetManager
) {

    commandExecutor.setGOProperty(
        {
            goType: SPRITE,
            tint: 0xffffff,
        },
        eventSheetManager
    )
}

export default Focus;