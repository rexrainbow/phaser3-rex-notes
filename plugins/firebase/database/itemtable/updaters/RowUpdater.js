import BaseUpdater from './BaseUpdater.js';
import ColumnUpdater from './ColumnUpdater.js';

class RowUpdater extends BaseUpdater {
    constructor(config) {
        super(config);
        this.data = {};
    }

    startUpdate() {
        this.rootRef.on('child_added', this.addRow, this);
        this.rootRef.on('child_removed', this.removeRow, this);
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addRow, this);
        this.rootRef.off('child_removed', this.removeRow, this);
    }

    addRow(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.data[key] = new ColumnUpdater({
            eventEmitter: this.getEventEmitter(),
            root: `${this.rootPath}/${key}`,
            value: value
        });
    }

    removeRow(snapshot) {
        this.data[snapshot.key].destroy();
        delete this.data[snapshot.key];
    }
}

export default RowUpdater;