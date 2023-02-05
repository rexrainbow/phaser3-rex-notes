var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    }

    var title = this.childrenMap.title;
    title.resetDisplayContent(config.title);

    var content = this.childrenMap.content;
    content.resetDisplayContent(config.content);

    var buttonA = this.childrenMap.actions[0];
    if (buttonA) {
        buttonA.resetDisplayContent(config.buttonA);
    }

    var buttonB = this.childrenMap.actions[1];
    if (buttonB) {
        buttonB.resetDisplayContent(config.buttonB);
    }

    return this;
}

export default ResetDisplayContent;