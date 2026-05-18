var AddMoveLine = function(startX?: any, startY?: any, endX?: any, endY?: any) {
    if (!this.moveToTask.hasOwnProperty('nextlines')) {
        this.moveToTask.nextlines = [];
    }
    this.moveToTask.nextlines.push(
        [startX, startY, endX, endY]
    );
    return this;
};

export default AddMoveLine;