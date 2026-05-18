import BaseUpdater from './BaseUpdater';
import ColumnUpdater from './ColumnUpdater';

class RowUpdater extends BaseUpdater {
    emit: any;
    eventNameMap: any;
    key: any;
    parent: any;
    removeChild: any;
    rootRef: any;
    setData: any;
    type: any;

    startUpdate() {
        this.rootRef.on('child_added', this.addRow, this);
        this.rootRef.on('child_removed', this.removeRow, this);
        return this;
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addRow, this);
        this.rootRef.off('child_removed', this.removeRow, this);
        return this;
    }

    addRow(snapshot?: any) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        switch (this.type) {
            case 2:
                this.emit(this.eventNameMap.addkey0, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNameMap.addkey1, this.key, key, value);
                break;
        }
    }

    removeRow(snapshot?: any) {
        var key = snapshot.key;
        this.removeChild(key);

        switch (this.type) {
            case 2:
                this.emit(this.eventNameMap.removekey0, key);
                break;
            default: // 3
                this.emit(this.eventNameMap.removekey1, this.key, key);
                break;
        }
    }

    get childClass() {
        return ColumnUpdater;
    }

    get pageKey() {
        return this.parent.key;
    }
}

export default RowUpdater;