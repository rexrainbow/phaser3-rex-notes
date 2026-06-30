const StartEventSheet = function (
    eventSheetManager,
    title,
    groupName,
    ignoreCondition,
    injectData
) {
    if (!title) {
        return null;
    }

    return eventSheetManager.startRun(title, groupName, ignoreCondition, injectData);
}

export default StartEventSheet;
