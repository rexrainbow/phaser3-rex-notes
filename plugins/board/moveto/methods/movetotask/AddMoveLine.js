var AddMoveLine = function (startX, startY, endX, endY) {
    if (!this.moveToTask.hasOwnProperty('nextlines')) {
        this.moveToTask.nextlines = [];
    }
    this.moveToTask.nextlines.push(
        [startX, startY, endX, endY]
    );
    return this;
};

export default AddMoveLine;