const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
var SetDraggable = function (sensor, draggable, dragTarget) {
    if (IsPlainObject(sensor)) {
        var config = sensor;
        sensor = config.sensor;
        dragTarget = config.target;
        draggable = config.draggable;
    } else {
        if (typeof (draggable) !== 'boolean') {
            dragTarget = draggable;
            draggable = undefined;
        }
    }

    var sensorType = typeof (sensor);
    if (sensorType === 'string') {
        var sensorName = sensor;
        sensor = this.getElement(sensorName);
        if (!sensor) {
            console.error(`Can get element '${sensorName}'`);
            return this;
        }
    } else if ((sensor === undefined) || (sensorType != 'object')) {
        draggable = sensor;
        sensor = this;
    }

    if (draggable === undefined) {
        draggable = true;
    }

    if (sensor.input && sensor.input._rexUIDragSizer) {
        // Draggable is already registered
        sensor.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        sensor.setInteractive();
        sensor.scene.input.setDraggable(sensor);
        sensor
            .on('drag', function (pointer, dragX, dragY) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.x += (dragX - sensor.x);
                currentDragTarget.y += (dragY - sensor.y);
                currentDragTarget.emit('sizer.drag', pointer, dragX, dragY);
            }, this)
            .on('dragstart', function (pointer, dragX, dragY) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.emit('sizer.dragstart', pointer, dragX, dragY);
            }, this)
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.emit('sizer.dragend', pointer, dragX, dragY, dropped);
            }, this)
            .on('drop', function (pointer, dropZone) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.emit('sizer.drop', pointer, dropZone);
            });
        sensor.input._rexUIDragSizer = true;
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}

export default SetDraggable;