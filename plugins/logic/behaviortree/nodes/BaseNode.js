import CreateUUID from '../utils/CreateUUID.js';
import { Expression, BooleanExpression, StringTemplateExpression } from './expressions';
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

    setTitle(title) {
        this.title = title;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    addExpression(expression) {
        return new Expression(expression);
    }

    addBooleanExpression(expression) {
        return new BooleanExpression(expression);
    }

    addStringTemplateExpression(expression) {
        return new StringTemplateExpression(expression);
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
        // Children will be closed before parent, otherwise abort children
        this.abortChildren(tick);
    }

    _exit(tick) {
        tick._exitNode(this);
        this.exit(tick);
    }

    _abort(tick) {
        this._close(tick);
        this.abort(tick);
    }

    enter(tick) { }

    open(tick) { }

    tick(tick) { }

    close(tick) { }

    exit(tick) { }

    abortChildren(tick) { }

    abort(tick) { }

    // open state of this node
    getNodeMemory(tick) {
        return tick.getNodeMemory(this.id);
    }

    getOpenState(tick) {
        return this.getNodeMemory(tick).$isOpen;
    }

    setOpenState(tick, state) {
        if (state === undefined) {
            state = true;
        }
        this.getNodeMemory(tick).$isOpen = state;
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
