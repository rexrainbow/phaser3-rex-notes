import { CreateID } from '../utils/CreateID';
import { Expression, BooleanExpression, StringTemplateExpression } from './expressions';
import { TREE, SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../constants';

export default class BaseNode {
    id: any;
    parent: any;

    category: any;
    description: any;
    name: any;
    properties: any;
    title: any;


    constructor(
        {
            id,
            category,
            name,
            title,
            description,
            properties
        } = {}
    ) {

        if (id === undefined) {
            id = CreateID();
        }

        this.parent = null;

        this.id = id;

        this.category = category || '';

        this.name = name || '';

        this.title = title || this.name;

        this.description = description || '';

        this.properties = properties || {};
    }

    destroy() {
        this.parent = undefined;
        this.properties = undefined;
    }

    setTitle(title?: any) {
        this.title = title;
        return this;
    }

    setName(name?: any) {
        this.name = name;
        return this;
    }

    setDescription(description?: any) {
        this.description = description;
        return this;
    }

    setParent(parent?: any) {
        this.parent = parent;
        return this;
    }

    getParent() {
        return this.parent;
    }

    getTree(tick?: any) {
        if (tick?: any) {
            return tick.tree;
        } else {
            var parent = this.parent;
            while (parent?: any) {
                if (parent.category === TREE) {
                    return parent;
                }
                parent = parent.parent;
            }
            return null;
        }
    }

    addExpression(expression?: any) {
        return new Expression(expression);
    }

    addBooleanExpression(expression?: any) {
        return new BooleanExpression(expression);
    }

    addStringTemplateExpression(expression?: any) {
        // TODO: Use mustache or handlebars ?
        return new StringTemplateExpression(expression);
    }

    _execute(tick?: any) {
        // ENTER
        this._enter(tick);

        // OPEN
        if (!this.getOpenState(tick)) {
            this._open(tick);
        }

        // TICK
        var status = this._tick(tick);

        // CLOSE
        if ((status === SUCCESS) || (status === FAILURE) ||
            (status === ABORT) || (status === ERROR)) {
            this._close(tick);
        }

        // EXIT
        this._exit(tick);

        return status;
    }

    _enter(tick?: any) {
        tick._enterNode(this);
        this.enter(tick);
    }

    _open(tick?: any) {
        tick._openNode(this);
        this.setOpenState(tick, true);
        this.open(tick);
    }

    _tick(tick?: any) {
        tick._tickNode(this);
        return this.tick(tick);
    }

    _close(tick?: any) {
        tick._closeNode(this);
        this.setOpenState(tick, false);
        this.close(tick);
        // Children will be closed before parent, otherwise abort children
        this.abortChildren(tick);
    }

    _exit(tick?: any) {
        tick._exitNode(this);
        this.exit(tick);
    }

    _abort(tick?: any) {
        this._close(tick);
        this.abort(tick);
    }

    enter(tick?: any) { }

    open(tick?: any) { }

    tick(tick?: any) { }

    close(tick?: any) { }

    exit(tick?: any) { }

    abortChildren(tick?: any) { }

    abort(tick?: any) { }

    // open state of this node
    getNodeMemory(tick?: any) {
        return tick.getNodeMemory(this.id);
    }

    getOpenState(tick?: any) {
        return this.getNodeMemory(tick).$isOpen;
    }

    setOpenState(tick?: any, state?: any) {
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