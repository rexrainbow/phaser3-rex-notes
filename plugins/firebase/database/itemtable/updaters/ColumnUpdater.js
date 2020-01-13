import BaseUpdater from './BaseUpdater.js';

class ColumnUpdater extends BaseUpdater {
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
        this.setData(key, value);

        switch (this.type) {
            case 1:
                this.emit(this.eventNames.addcol, key, value);
                break;
            case 2:
                this.emit(this.eventNames.addcol, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.addcol, this.pageKey, this.key, key, value);
                break;
        }
    }

    removeCol(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);

        switch (this.type) {
            case 1:
                this.emit(this.eventNames.removecol, key);
                break;
            case 2:
                this.emit(this.eventNames.removecol, this.key, key);
                break;
            default: // 3
                this.emit(this.eventNames.removecol, this.pageKey, this.key, key);
                break;
        }
    }

    changeColValue(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        switch (this.type) {
            case 1:
                this.emit(this.eventNames.changecol, key, value);
                break;
            case 2:
                this.emit(this.eventNames.changecol, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.changecol, this.pageKey, this.key, key, value);
                break;
        }
    }

    setChildData(key, data) {
        this.data[key] = data;
        return this;
    }

    removeChild(key) {
        if (this.data.hasOwnProperty(key)) {
            delete this.data[key];
        }
        return this;
    }

    getData(key) {
        if (key === undefined) {
            return this.data;
        } else {
            return this.data[key];
        }
    }

    get pageKey() {
        return this.parent.key;
    }

}

export default ColumnUpdater;