var DestroyManagers = function (fromScene) {
    this.waitEventManager.removeWaitEvents();

    if (this.soundManager) {
        this.soundManager.destroy();
    }
    this.soundManager = undefined;

    for (var name in this.gameObjectManagers) {
        this.gameObjectManagers[name].destroy(fromScene);
        delete this.gameObjectManagers[name];
    }

    if (this.timeline) {
        this.timeline.destroy();
    }
    
    this.timeline = undefined;

    this.managersScene = undefined;
}

export default DestroyManagers;