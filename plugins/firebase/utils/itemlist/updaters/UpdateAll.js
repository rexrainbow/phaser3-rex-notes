import GetAllChildrenCallback from '../callbacks/GetAllChildrenCallback.js';

var Updater = {
    start(query) {
        query.on('value', GetAllChildrenCallback, this);
        return this;
    },
    stop() {
        this.query.off('value', GetAllChildrenCallback, this);
        return this;
    }
}

export default Updater;