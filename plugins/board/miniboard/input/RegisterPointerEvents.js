var RegisterPointerEvents = function () {
    this
        .on('pointerdown', function (pointer, localX, localY, event) {
            FireTileEvent.call(this, pointer, 'gameobjectdown', 'miniboard.pointerdown');
        }, this)
        .on('pointerup', function (pointer, localX, localY, event) {
            FireTileEvent.call(this, pointer, 'gameobjectup', 'miniboard.pointerup');
        }, this)
        .on('pointermove', function (pointer, localX, localY, event) {
            FireTileEvent.call(this, pointer, 'gameobjectmove', 'miniboard.pointermove');
        }, this)
}

var FireTileEvent = function (pointer, miniboardEvent, tileEvent) {
    var gameObjects = this.worldXYToChess(pointer.worldX, pointer.worldY, globChessArray);
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit(tileEvent, pointer);
        }
        this.emit(miniboardEvent, pointer, gameObject);
    }
    globChessArray.length = 0;
}

var globChessArray = [];

export default RegisterPointerEvents;