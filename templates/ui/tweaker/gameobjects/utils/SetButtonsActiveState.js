var SetButtonsActiveStateByText = function (buttons, text) {
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        var button = buttons[i];
        if (!button) {
            continue;
        }

        button.setActiveState(button.text === text);
    }
}

export default SetButtonsActiveStateByText;