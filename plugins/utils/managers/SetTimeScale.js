var SetTimeScale = function (value) {
    for (var name in this.gameObjectManagers) {
        this.gameObjectManagers[name].setTimeScale(value);
    }
    return this;
}

export default SetTimeScale;