const Graphics = Phaser.GameObjects.Graphics

var DrawGameObjectsBounds = function (goTypes, graphics, config) {
    if (goTypes instanceof Graphics) {
        config = graphics;
        graphics = goTypes;
        goTypes = undefined;
    }

    if (goTypes === undefined) {
        goTypes = this.gameObjectManagerNames;
    }

    if (!Array.isArray(goTypes)) {
        goTypes = [goTypes];
    }
    for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
        this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config)
    }

    return this;
}

export default DrawGameObjectsBounds;