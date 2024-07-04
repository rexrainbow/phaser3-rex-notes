var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    }

    ResetTitle.call(this, config);
    ResetContent.call(this, config);
    ResetActions.call(this, config);

    return this;
}

var ResetTitle = function (config) {
    var title = this.childrenMap.title;
    if (config.title === null) {
        this.hide(title);
    } else {
        this.show(title);

        title.resetDisplayContent(config.title);
    }
}

var ResetContent = function (config) {
    var firstNameTitle = this.childrenMap.firstNameTitle;
    if (config.firstNameTitle === null) {
        this.hide(firstNameTitle);
    } else {
        this.show(firstNameTitle);

        // Label
        var firstNameTitleConfig = config.firstNameTitle || '';
        firstNameTitle.resetDisplayContent(firstNameTitleConfig);
    }

    var firstNameInput = this.childrenMap.firstNameInput;
    if (config.firstName === null) {
        this.hide(firstNameInput);
    } else {
        this.show(firstNameInput);

        // Text
        var firstName = config.firstName || '';
        firstNameInput.setText(firstName);
    }

    var lastNameTitle = this.childrenMap.lastNameTitle;
    if (config.lastNameTitle === null) {
        this.hide(lastNameTitle);
    } else {
        this.show(lastNameTitle);

        // Label
        var lastNameTitleConfig = config.lastNameTitle || '';
        lastNameTitle.resetDisplayContent(lastNameTitleConfig);
    }

    var lastNameInput = this.childrenMap.lastNameInput;
    if (config.lastName === null) {
        this.hide(lastNameInput);
    } else {
        this.show(lastNameInput);

        // Text
        var lastName = config.lastName || '';
        lastNameInput.setText(lastName);
    }
}

var ResetActions = function (config) {
    var action = this.childrenMap.actions[0];
    if (config.button === null) {
        this.hide(action);
    } else {
        this.show(action);
        action.resetDisplayContent(config.button);
    }
}

export default ResetDisplayContent;