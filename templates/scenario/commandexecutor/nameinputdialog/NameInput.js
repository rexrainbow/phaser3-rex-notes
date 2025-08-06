var NameInput = function (
    gameObject,
    {
        title = null,
        firstNameTitle = null, lastNameTitle = null,
        button = 'OK',
        firstName = '', lastName = '',
        firstNameKey = 'firstName', lastNameKey = 'lastName'
    } = {},

    commandExecutor, eventSheetManager, eventSheet
) {

    gameObject
        .setVisible(true)
        .resetDisplayContent({
            title,
            firstNameTitle,
            lastNameTitle,
            button,
            firstName,
            lastName
        })
        .layout();

    commandExecutor.waitEvent(gameObject, 'complete');

    gameObject
        .modalPromise({ destroy: false })
        .then(function (data) {
            eventSheetManager
                .setData(firstNameKey, data.firstName)
                .setData(lastNameKey, data.lastName)
            gameObject.emit('complete');
        })

}

export default NameInput;