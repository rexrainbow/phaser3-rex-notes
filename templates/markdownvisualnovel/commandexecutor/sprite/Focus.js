var Focus = function (
    gameObject,
    {
        bringToTop = true,
        fadeOutOthers = 0.5,
        duration = 300,
        wait = true
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    if (bringToTop) {
        gameObject.bringMeToTop();
    }

    if (typeof (fadeOutOthers) === 'number') {
        if (wait) {
            commandExecutor.setWaitEventFlag();
        }

        commandExecutor.easeGOProperty(
            {
                id: '!' + gameObject.name,
                alpha: fadeOutOthers,
                duration: duration,
                wait: wait,
            },
            eventSheetManager
        )
    }
}

export default Focus