import { CreateID } from '../utils/CreateID.js';
import { TREE, SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../constants.js';
import IsExpressionLike from '../utils/IsExpressionLike.js';
import DecodeExpression from '../utils/DecodeExpression.js';
import ResolveNode from '../behaviortree/dump/ResolveNode.js';

export default class BaseNode {

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

        this.category = (category === undefined) ? '' : category;

        this.name = (name === undefined) ? '' : name;

        this.title = (title === undefined) ? this.name : title;

        this.description = (description === undefined) ? '' : description;

        this.properties = properties || {};
    }

    destroy() {
        this.parent = undefined;
        this.properties = undefined;
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

    getParent() {
        return this.parent;
    }

    getTree(tick) {
        if (tick) {
            return tick.tree;
        } else {
            var parent = this.parent;
            while (parent) {
                if (parent.category === TREE) {
                    return parent;
                }
                parent = parent.parent;
            }
            return null;
        }
    }

    addExpression(name, node, nodePool) {
        node = DecodeExpression(node, nodePool, name);

        // Ignore null, undefined
        if (node == null) {
            return null;
        }

        if (this.expressions === undefined) {
            this.expressions = {};
        }

        // Get node from nodePool
        if (nodePool && (typeof (node) === 'string')) {
            node = ResolveNode(node, nodePool, name, 'expression node');
        }

        this.expressions[name] = node;  // Expression node or constant number, boolean

        if (IsExpressionLike(node)) {
            node.setParent(this);
        }

        return node;
    }

    getExpressionValue(tick, name) {
        var value;
        var expression = this.expressions[name];
        if (IsExpressionLike(expression)) {
            value = expression.getLastValue(tick);
        } else {
            value = expression;
        }
        return value;
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
        if ((status === SUCCESS) || (status === FAILURE) ||
            (status === ABORT) || (status === ERROR)) {
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
