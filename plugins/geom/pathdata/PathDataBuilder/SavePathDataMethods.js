import Copy from '../../../utils/array/Copy.js';

export default {
    savePathData() {
        if (this.pathDataSaved) {
            return this;
        }

        this.pathDataSave = [...this.pathData];
        this.pathData.length = 0;
        this.pathDataSaved = true;
        return this;
    },

    restorePathData() {
        if (!this.pathDataSaved) {
            return this;
        }

        Copy(this.pathData, this.pathDataSave);
        this.pathDataSave = undefined;
        this.pathDataSaved = false;
        this.firstPointX = this.pathData[0];
        this.firstPointY = this.pathData[1];
        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        this.resetControlPoint();
        return this;
    },
}
