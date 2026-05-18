import { TREE, TREE_STATE, IDLE } from '../constants';
import { CreateID, SetSerialNumber, SetSerialNumberPrefix, GetSerialNumber } from '../utils/CreateID';
import DataMethods from './DataMethods';
import Dump from './Dump';
import Load from './Load';
import Tick from '../tick/Tick';
import { BreadthFirstSearch } from './Traversal';

class BehaviorTree {
    id: any;

    _root: any;
    category: any;
    description: any;
    name: any;
    properties: any;
    ticker: any;
    title: any;


    constructor(
        {
            id,
            title,
            description,
            properties,
            root = null
        } = {}
    ) {

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
    }

    destroy() {
        this._root.destroy();
        this.ticker.destroy();

        this._root = undefined;
        this.ticker = undefined;
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

    setRoot(node?: any) {
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
        if (node?: any) {
            this._root = node;
            node.setParent(this);
        } else {
            if (this._root) {
                this._root.setParent(null);
            }
            this._root = null;
        }
    }

    forEachNode(callback?: any, scope?: any) {
        BreadthFirstSearch(this.root, callback, scope);
        return this;
    }

    getAllNodes(out?: any) {
        if (out === undefined) {
            out = [];
        }
        this.forEachNode(function(node?: any) {
            out.push(node)
        })
        return out;
    }

    getChildrenNodes(parent?: any, out?: any) {
        if (parent === undefined) {
            parent = this.root;
        }
        if (out === undefined) {
            out = [];
        }

        BreadthFirstSearch(parent, function(node?: any) {
            out.push(node)
        });

        return out;
    }

    tick(blackboard?: any, target?: any) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTarget(target)
            .reset();

        /* TICK NODE */
        var state = this.root._execute(ticker);

        /* POPULATE BLACKBOARD */
        // blackboard.set('$openNodes', ticker._openNodes.slice(0), this.id);
        // blackboard.set('$nodeCount', ticker._nodeCount, this.id);
        blackboard.set(TREE_STATE, state, this.id);

        return state;
    }

    abort(blackboard?: any, target?: any) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        var ticker = this.ticker;
        ticker
            .setBlackBoard(blackboard)
            .setTarget(target)
            .reset();

        /* ABORT NODE */
        this.root.abortChildren(ticker);

        /* POPULATE BLACKBOARD */
        blackboard.set(TREE_STATE, IDLE, this.id);

        return IDLE;
    }

    static setStartIDValue(value?: any) {
        SetSerialNumber(value);
    }

    static getSerialNumber() {
        return GetSerialNumber();
    }

    static setSerialIDPrefix(prefix?: any) {
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