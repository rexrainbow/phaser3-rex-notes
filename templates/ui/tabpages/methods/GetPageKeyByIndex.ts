var GetPageKeyByIndex = function(index?: any) {
    var buttons = this.getElement('tabs.buttons');
    if (index >= buttons.length) {
        return undefined;
    }

    return buttons[index].name;
}

export default GetPageKeyByIndex;