import { EVT_EVENTSHEET_ADD } from '../constants.js';

export default {
    addTree(eventsheet) {
        this.trees.push(eventsheet);
        this.parent.emit(EVT_EVENTSHEET_ADD, eventsheet.title, this.name, this.parent, eventsheet, this);
        return this;
    },
}
