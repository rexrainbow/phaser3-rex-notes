import { SPRITE } from '../../const/GameObjects';

var Focus = function (
    gameObject,
    config,

    commandExecutor, eventSheetManager, eventSheet
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