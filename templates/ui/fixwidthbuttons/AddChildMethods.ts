import FixWidthSizer from '../fixwidthsizer/FixWidthSizer';
import IsArray from '../../../plugins/utils/object/IsArray';

const SizerAdd = FixWidthSizer.prototype.add;

var Add = function(gameObject?: any) {
    SizerAdd.call(this, gameObject);
    this.buttonGroup.add(gameObject);
    return this;
};

export default {
    addButton(gameObject?: any) {
        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Add.call(this, gameObjects[i]);
            }
        } else {
            Add.call(this, gameObject);
        }
        return this;
    },

    addButtons(gameObjects?: any) {
        if (IsArray(gameObjects[0])) {
            // 2d array
            var lines = gameObjects, line;
            for (var lineIdx = 0, lastLineIdx = (lines.length - 1); lineIdx <= lastLineIdx; lineIdx++) {
                line = lines[lineIdx];
                for (var i = 0, cnt = line.length; i < cnt; i++) {
                    Add.call(this, line[i]);
                }
                if (lineIdx > lastLineIdx) {
                    SizerAdd.addNewLine(this);
                }
            }
        } else {
            // 1d array
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Add.call(this, gameObjects[i]);
            }
        }
        return this;
    }
}