import EventEmitter from '../../../utils/eventemitter/EventEmitter.js';
import { TREE, TREE_STATE, IDLE, RUNNING } from '../constants.js';
import { CreateID, SetSerialNumber, SetSerialNumberPrefix, GetSerialNumber } from '../utils/CreateID.js';
import DataMethods from './DataMethods.js';
import Dump from './dump/Dump.js';
import Load from './dump/Load.js';
import Tick from '../tick/Tick.js';
import { BreadthFirstSearch } from './Traversal.js';

class BehaviorTree extends EventEmitter {

    constructor(
        {
            id,
            title,
            description,
            properties,
            root = null
        } = {}
    ) {

        super();

        if (id === undefined) {
            id = CreateID();
        }

        this.id = id;

        this.name = '';

        this.category = TREE;

        this.title = title || '';

        this.description = description || '';

        this.properties = properties || {};

        this._root = root;

        this.ticker = (new Tick()).setTree(this);

        this.lastState = IDLE;

        this.setEventEmitter(this);
    }

    destroy() {
        this._root.destroy();
        this.ticker.destroy();
        super.destroy();

        this._root = undefined;
        this.ticker = undefined;
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

    setRoot(node) {
        this.root = node;
        return this;
    }

    getRoot() {
        return this.root;
    }

    get root() {
        return this._root;
    }

    set root(node) {
        if (node) {
            this._root = node;
            node.setParent(this);
        } else {
            if (this._root) {
                this._root.setParent(null);
            }
            this._root = null;
        }
    }

    forEachNode(callback, scope) {
        BreadthFirstSearch(this.root, callback, scope);
        return this;
    }

    getAllNodes(out) {
        if (out === undefined) {
            out = [];
        }
        this.forEachNode(function (node) {
            out.push(node)
        })
        return out;
    }

    getChildrenNodes(parent, out) {
        if (parent === undefined) {
            parent = this.root;
        }
        if (out === undefined) {
            out = [];
        }

        BreadthFirstSearch(parent, function (node) {
            out.push(node)
        });

        return out;
    }

    get expressionParser() {
        return this.ticker.expressionParser;
    }

    set expressionParser(value) {
        this.ticker.expressionParser = value;
    }

    setExpressionParser(parser) {
        this.expressionParser = parser;
        return this;
    }

    getExpressionParser() {
        return this.expressionParser;
    }

    get stringTemplate() {
        return this.ticker.stringTemplate;
    }

    set stringTemplate(value) {
        this.ticker.stringTemplate = value;
    }

    setStringTemplate(parser) {
        this.stringTemplate = parser;
        return this;
    }

    getStringTemplate() {
        return this.stringTemplate;
    }

    setEventEnable(enable = true) {
        this.ticker.setEventEnable(enable);
        return this;
    }

    toggleEventEnable() {
        this.ticker.toggleEventEnable();
        return this;
    }

    tick(blackboard, target) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTarget(target)
            .reset();

        ticker.emitTickStart();

        /* TICK NODE */
        var state = this.root._execute(ticker);

        /* POPULATE BLACKBOARD */
        // blackboard.set('$openNodes', ticker._openNodes.slice(0), this.id);
        // blackboard.set('$nodeCount', ticker._nodeCount, this.id);
        blackboard.set(TREE_STATE, state, this.id);

        this.lastState = state;

        ticker.emitTickEnd(state);

        return state;
    }

    abort(blackboard, target) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTarget(target)
            .reset();

        ticker.emitTickStart();

        /* ABORT NODE */
        this.root.abortChildren(ticker);

        /* POPULATE BLACKBOARD */
        blackboard.set(TREE_STATE, IDLE, this.id);

        this.lastState = IDLE;

        ticker.emitTickEnd(IDLE);

        return IDLE;
    }

    isRunningState() {
        return this.lastState === RUNNING;
    }

    setEventEmitter(eventEmitter) {
        this.ticker.setEventEmitter(eventEmitter);
        return this;
    }

    static setStartIDValue(value) {
        SetSerialNumber(value);
    }

    static getSerialNumber() {
        return GetSerialNumber();
    }

    static setSerialIDPrefix(prefix) {
        SetSerialNumberPrefix(prefix);
    }
};

var Methods = {
    dump: Dump,
    load: Load,
}
Object.assign(
    BehaviorTree.prototype,
    Methods,
    DataMethods,
);

export default BehaviorTree;
