import CreateUUID from '../utils/CreateUUID.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

export default class BaseNode {

    constructor({ category, name, title, description, properties } = {}) {

        this.id = CreateUUID();

        this.category = category || '';

        this.name = name || '';

        this.title = title || this.name;

        this.description = description || '';

        this.properties = properties || {};
    }

    _execute(tick) {
        // ENTER
        this._enter(tick);

        // OPEN
        if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
            this._open(tick);
        }

        // TICK
        var status = this._tick(tick);

        // CLOSE
        if (status !== RUNNING) {
            this._close(tick);
        }

        // EXIT
        this._exit(tick);

        return status;
    }

    _enter(tick) {
        tick._enterNode(this);
        this.enter(tick);
    }

    _open(tick) {
        tick._openNode(this);
        tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
        this.open(tick);
    }

    _tick(tick) {
        tick._tickNode(this);
        return this.tick(tick);
    }

    _close(tick) {
        tick._closeNode(this);
        tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
        this.close(tick);
    }

    _exit(tick) {
        tick._exitNode(this);
        this.exit(tick);
    }

    enter(tick) { }

    open(tick) { }

    tick(tick) { }

    close(tick) { }

    exit(tick) { }

    // Return state value
    get SUCCESS() {
        return SUCCESS;
    }

    get FAILURE() {
        return FAILURE;
    }

    get RUNNING() {
        return RUNNING;
    }

    get ERROR() {
        return ERROR;
    }
};
