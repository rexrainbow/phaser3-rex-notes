import GetAllChildrenCallback from '../callbacks/GetAllChildrenCallback.js';

var Updater = {
    start(query) {
        this.isUpdating = false;
        query.once('value', GetAllChildrenCallback, this);
        return this;
    },
    stop() {
        // Do nothing
        return this;
    }
}

export default Updater;