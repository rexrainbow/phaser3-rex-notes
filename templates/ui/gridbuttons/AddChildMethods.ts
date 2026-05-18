import GridSizer from '../gridsizer/GridSizer';

const SizerAdd = GridSizer.prototype.add;

export default {
    addButton(gameObject?: any, columnIndex?: any, rowIndex?: any) {
        SizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
        this.buttonGroup.add(gameObject);
        return this;
    },

    addButtons(gameObjects?: any, rowThenColumn?: any) {
        for (var i = 0, cnt = gameObjects; i < cnt; i++) {
            this.addButton(gameObjects[i], undefined, rowThenColumn);
        }
        return this;
    }
}