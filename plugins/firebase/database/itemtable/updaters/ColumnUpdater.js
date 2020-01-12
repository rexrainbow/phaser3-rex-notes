import BaseUpdater from './BaseUpdater.js';
import GetValue from '../../../utils/object/GetValue.js';
import Clear from '../../../../utils/object/Clear.js';

class ColumnUpdater extends BaseUpdater {
    constructor(config) {
        super(config);
        this.data = {};
    }

    startUpdate() {
        this.rootRef.on('child_added', this.addCol, this);
        this.rootRef.on('child_removed', this.removeCol, this);
        this.rootRef.on('child_changed', this.changeColValue, this);
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addCol, this);
        this.rootRef.off('child_removed', this.removeCol, this);
        this.rootRef.off('child_changed', this.changeColValue, this);
    }

    addCol(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setValue(key, value);
    }

    removeCol(snapshot) {
        var key = snapshot.key;
        delete this.data[key];
    }

    changeColValue(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setValue(key, value);
    }

    setValue(key, value) {
        if (key === undefined) {
            Clear(this.data);
        } else if (value === undefined) {
            this.data = key; // JSON data
        } else {
            this.data[key] = value;
        }
        return this;
    }
}

export default ColumnUpdater;