var IsInTouching = function (pointer) {
    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }
    this.getBounds(globRect);

    if (pointer !== undefined) {
        return globRect.contains(pointer.x, pointer.y);

    } else {
        var inputManager = this.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (globRect.contains(pointer.x, pointer.y)) {
                return true;
            }
        }
        return false;

    }

}

var globRect = undefined;

export default IsInTouching;