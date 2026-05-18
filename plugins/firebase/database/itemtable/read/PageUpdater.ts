import BaseUpdater from './BaseUpdater';
import RowUpdater from './RowUpdater';

class PageUpdater extends BaseUpdater {
    emit: any;
    eventNameMap: any;
    removeChild: any;
    rootRef: any;
    setData: any;

    constructor(config?: any) {
        super(config);
    }

    startUpdate() {
        this.rootRef.on('child_added', this.addPage, this);
        this.rootRef.on('child_removed', this.removePage, this);
        return this;
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addPage, this);
        this.rootRef.off('child_removed', this.removePage, this);
        return this;
    }

    addPage(snapshot?: any) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        this.emit(this.eventNameMap.addkey0, key, value);
    }

    removePage(snapshot?: any) {
        var key = snapshot.key;
        this.removeChild(key);

        this.emit(this.eventNameMap.removekey0, key);
    }

    get childClass() {
        return RowUpdater;
    }
}

export default PageUpdater;