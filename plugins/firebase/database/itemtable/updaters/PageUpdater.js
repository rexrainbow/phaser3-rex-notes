import BaseUpdater from './BaseUpdater.js';

class PageUpdater extends BaseUpdater {
    constructor(config) {
        super(config);
    }

    startUpdate() {
        this.rootRef.on('child_added', this.addPage, this);
        this.rootRef.on('child_removed', this.removePage, this);
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addPage, this);
        this.rootRef.off('child_removed', this.removePage, this);
    }

    addPage(snapshot) {

    }

    removePage(snapshot) {

    }
}

export default PageUpdater;