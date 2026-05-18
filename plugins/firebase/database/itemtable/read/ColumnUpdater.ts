import BaseUpdater from './BaseUpdater';

class ColumnUpdater extends BaseUpdater {
    emit: any;
    eventNameMap: any;
    key: any;
    parent: any;
    removeChild: any;
    rootRef: any;
    setData: any;
    table: any;
    type: any;

    startUpdate() {
        this.rootRef.on('child_added', this.addCol, this);
        this.rootRef.on('child_removed', this.removeCol, this);
        this.rootRef.on('child_changed', this.changeColValue, this);
        return this;
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addCol, this);
        this.rootRef.off('child_removed', this.removeCol, this);
        this.rootRef.off('child_changed', this.changeColValue, this);
        return this;
    }

    addCol(snapshot?: any) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        switch (this.type) {
            case 1:
                this.emit(this.eventNameMap.addkey0, key, value);
                break;
            case 2:
                this.emit(this.eventNameMap.addkey1, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNameMap.addkey2, this.pageKey, this.key, key, value);
                break;
        }
        this.emit(this.eventNameMap.update, this.table.data);
    }

    removeCol(snapshot?: any) {
        var key = snapshot.key;
        this.removeChild(key);

        switch (this.type) {
            case 1:
                this.emit(this.eventNameMap.removekey0, key);
                break;
            case 2:
                this.emit(this.eventNameMap.removekey1, this.key, key);
                break;
            default: // 3
                this.emit(this.eventNameMap.removekey2, this.pageKey, this.key, key);
                break;
        }
        this.emit(this.eventNameMap.update, this.table.data);        
    }

    changeColValue(snapshot?: any) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        switch (this.type) {
            case 1:
                this.emit(this.eventNameMap.changekey0, key, value);
                break;
            case 2:
                this.emit(this.eventNameMap.changekey1, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNameMap.changekey2, this.pageKey, this.key, key, value);
                break;
        }
        this.emit(this.eventNameMap.update, this.table.data);        
    }

    get pageKey() {
        return this.parent.key;
    }

}

export default ColumnUpdater;