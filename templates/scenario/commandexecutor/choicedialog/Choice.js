var Choice = function (
    gameObject,
    {
        title = null,
        content = null,
        option1, option2, option3,
        resultKey = 'choiceIndex'
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {

    var choices = [];
    if (option1) { choices.push({ text: option1, value: 1 }); }
    if (option2) { choices.push({ text: option2, value: 2 }); }
    if (option3) { choices.push({ text: option3, value: 3 }); }

    gameObject
        .setVisible(true)
        .resetDisplayContent({
            title,
            content,
            choices,
        })
        .layout();

    commandExecutor.waitEvent(gameObject, 'complete');

    gameObject
        .modalPromise({ destroy: false })
        .then(function (data) {
            eventSheetManager.setData(resultKey, data.value);
            gameObject.emit('complete');
        })

}

export default Choice;