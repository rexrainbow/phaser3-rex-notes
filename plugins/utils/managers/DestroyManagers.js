var DestroyManagers = function (fromScene) {
    this.waitEventManager.destroy();
    this.waitEventManager = undefined;

    for (var name in this.gameObjectManagers) {
        this.gameObjectManagers[name].destroy(fromScene);
        delete this.gameObjectManagers[name];
    }

    if (this.soundManager) {
        this.soundManager.destroy();
        this.soundManager = undefined;
    }

    if (this.timeline) {
        this.timeline.destroy();
        this.timeline = undefined;
    }

    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = undefined;
}

export default DestroyManagers;