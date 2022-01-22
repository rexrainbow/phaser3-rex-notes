import CreateUUID from '../utils/CreateUUID.js';
import { Variable, BooleanVariable, StringTemplateVariable } from '../utils/Variables/';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

export default class BaseNode {

    constructor(
        {
            category,
            name,
            title,
            description,
            properties
        } = {}
    ) {

        this.parent = null;

        this.id = CreateUUID();

        this.category = category || '';

        this.name = name || '';

        this.title = title || this.name;

        this.description = description || '';

        this.properties = properties || {};
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    addVariable(expression) {
        return new Variable(expression);
    }

    addBooleanVariable(expression) {
        return new BooleanVariable(expression);
    }

    addStringTemplateVariable(expression) {
        return new StringTemplateVariable(expression);
    }

    _execute(tick) {
        // ENTER
        this._enter(tick);

        // OPEN
        if (!this.getOpenState(tick)) {
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
        this.setOpenState(tick, true);
        this.open(tick);
    }

    _tick(tick) {
        tick._tickNode(this);
        return this.tick(tick);
    }

    _close(tick) {
        tick._closeNode(this);
        this.setOpenState(tick, false);
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

    // open state of this node
    getOpenState(tick) {
        return tick.getNodeMemory().$isOpen;
    }

    setOpenState(tick, state) {
        if (state === undefined) {
            state = true;
        }
        tick.getNodeMemory().$isOpen = state;
        return this;
    }

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
