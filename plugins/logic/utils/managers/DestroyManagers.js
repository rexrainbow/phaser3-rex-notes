var DestroyManagers = function (fromScene) {
    if (this.soundManager) {
        this.soundManager.destroy(fromScene);
    }
    this.soundManager = undefined;

    for (var name in this.gameObjectManagers) {
        this.gameObjectManagers.destroy(fromScene);
        delete this.gameObjectManagers[name];
    }

    this.scene = undefined;
}

export default DestroyManagers;