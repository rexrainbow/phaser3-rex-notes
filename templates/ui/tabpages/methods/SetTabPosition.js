var TabsPositionToIndex = {
    top: 1,
    left: 3,
    right: 5,
    bottom: 7
};

var TabsPositionToTabsPaddingKey = {
    top: 'bottom',
    left: 'right',
    right: 'left',
    bottom: 'top'
}

var SetTabPosition = function (tabsPosition) {
    var newIndex = TabsPositionToIndex[tabsPosition];
    if (newIndex === undefined) {
        return this;
    }

    var tabs = this.childrenMap.tabs;
    var currentIndex = this.sizerChildren.indexOf(tabs);
    if (currentIndex === newIndex) {
        return this;
    }

    this.sizerChildren[currentIndex] = null;
    this.sizerChildren[newIndex] = tabs;

    var tabPadding = this.getSizerConfig(tabs).padding;
    var currentPaddingKey = TabsPositionToTabsPaddingKey[this.tabsPosition];
    var newPaddingKey = TabsPositionToTabsPaddingKey[tabsPosition];
    tabPadding[newPaddingKey] = tabPadding[currentPaddingKey];
    tabPadding[currentPaddingKey] = 0;

    this.tabsPosition = tabsPosition;

    return this;
}

export default SetTabPosition;