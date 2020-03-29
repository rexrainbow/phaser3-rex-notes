import CreateUUID from '../utils/CreateUUID.js';
import { COMPOSITE, DECORATOR } from '../constants';
import * as Decorators from '../decorators';
import * as Composites from '../composites';
import * as Actions from '../actions';
import Tick from './Tick';

/**
 * The BehaviorTree class, as the name implies, represents the Behavior Tree
 * structure.
 *
 * There are two ways to construct a Behavior Tree: by manually setting the
 * root node, or by loading it from a data structure (which can be loaded
 * from a JSON). Both methods are shown in the examples below and better
 * explained in the user guide.
 *
 * The tick method must be called periodically, in order to send the tick
 * signal to all nodes in the tree, starting from the root. The method
 * `BehaviorTree.tick` receives a target object and a blackboard as
 * parameters. The target object can be anything: a game agent, a system, a
 * DOM object, etc. This target is not used by any piece of Behavior3JS,
 * i.e., the target object will only be used by custom nodes.
 *
 * The blackboard is obligatory and must be an instance of `Blackboard`. This
 * requirement is necessary due to the fact that neither `BehaviorTree` or
 * any node will store the execution variables in its own object (e.g., the
 * BT does not store the target, information about opened nodes or number of
 * times the tree was called). But because of this, you only need a single
 * tree instance to control multiple (maybe hundreds) objects.
 *
 * Manual construction of a Behavior Tree
 * --------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.root = new b3.Sequence({children:[
 *       new b3.Priority({children:[
 *         new MyCustomNode(),
 *         new MyCustomNode()
 *       ]}),
 *       ...
 *     ]});
 *
 *
 * Loading a Behavior Tree from data structure
 * -------------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.load({
 *       'title'       : 'Behavior Tree title'
 *       'description' : 'My description'
 *       'root'        : 'node-id-1'
 *       'nodes'       : {
 *         'node-id-1' : {
 *           'name'        : 'Priority', // this is the node type
 *           'title'       : 'Root Node',
 *           'description' : 'Description',
 *           'children'    : ['node-id-2', 'node-id-3'],
 *         },
 *         ...
 *       }
 *     })
 *
 *
 * @module b3
 * @class BehaviorTree
 **/

export default class BehaviorTree {

    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor() {
        /**
         * The tree id, must be unique. By default, created with `CreateUUID`.
         * @property {String} id
         * @readOnly
         **/
        this.id = CreateUUID();

        /**
         * The tree title.
         * @property {String} title
         * @readonly
         **/
        this.title = '';

        /**
         * Description of the tree.
         * @property {String} description
         * @readonly
         **/
        this.description = '';

        /**
         * A dictionary with (key-value) properties. Useful to define custom
         * variables in the visual editor.
         *
         * @property {Object} properties
         * @readonly
         **/
        this.properties = {};

        /**
         * The reference to the root node. Must be an instance of `BaseNode`.
         * @property {BaseNode} root
         **/
        this.root = null;

        /**
         * The reference to the debug instance.
         * @property {Object} debug
         **/
        this.debug = null;
    }

    /**
     * This method loads a Behavior Tree from a data structure, populating this
     * object with the provided data. Notice that, the data structure must
     * follow the format specified by Behavior3JS. Consult the guide to know
     * more about this format.
     *
     * You probably want to use custom nodes in your BTs, thus, you need to
     * provide the `names` object, in which this method can find the nodes by
     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary,
     * as long as this method can find the node by its name, for example:
     *
     *     //json
     *     ...
     *     'node1': {
     *       'name': MyCustomNode,
     *       'title': ...
     *     }
     *     ...
     *
     *     //code
     *     var bt = new b3.BehaviorTree();
     *     bt.load(data, {'MyCustomNode':MyCustomNode})
     *
     *
     * @method load
     * @param {Object} data The data structure representing a Behavior Tree.
     * @param {Object} [names] A namespace or dict containing custom nodes.
     **/
    load(data, names) {
        names = names || {};

        this.title = data.title || this.title;
        this.description = data.description || this.description;
        this.properties = data.properties || this.properties;

        var nodes = {};
        var id, spec, node;
        // Create the node list (without connection between them)
        for (id in data.nodes) {
            spec = data.nodes[id];
            var Cls;

            if (spec.name in names) {
                // Look for the name in custom nodes
                Cls = names[spec.name];
            } else if (spec.name in Decorators) {
                // Look for the name in default nodes
                Cls = Decorators[spec.name];
            } else if (spec.name in Composites) {
                Cls = Composites[spec.name];
            } else if (spec.name in Actions) {
                Cls = Actions[spec.name];
            } else {
                // Invalid node name
                throw new EvalError('BehaviorTree.load: Invalid node name + "' +
                    spec.name + '".');
            }

            node = new Cls(spec.properties);
            node.id = spec.id || node.id;
            node.title = spec.title || node.title;
            node.description = spec.description || node.description;
            node.properties = spec.properties || node.properties;

            nodes[id] = node;
        }

        // Connect the nodes
        for (id in data.nodes) {
            spec = data.nodes[id];
            node = nodes[id];

            if (node.category === COMPOSITE && spec.children) {
                for (var i = 0; i < spec.children.length; i++) {
                    var cid = spec.children[i];
                    node.children.push(nodes[cid]);
                }
            } else if (node.category === DECORATOR && spec.child) {
                node.child = nodes[spec.child];
            }
        }

        this.root = nodes[data.root];
    }

    /**
     * This method dump the current BT into a data structure.
     *
     * @method dump
     * @return {Object} A data object representing this tree.
     **/
    dump() {
        var data = {};
        var customNames = [];

        data.title = this.title;
        data.description = this.description;
        data.root = (this.root) ? this.root.id : null;
        data.properties = this.properties;
        data.nodes = {};
        data.custom_nodes = [];

        if (!this.root) return data;

        var stack = [this.root];
        while (stack.length > 0) {
            var node = stack.pop();

            var spec = {};
            spec.id = node.id;
            spec.name = node.name;
            spec.title = node.title;
            spec.description = node.description;
            spec.properties = node.properties;

            // verify custom node
            var proto = (node.constructor && node.constructor.prototype);
            var nodeName = (proto && proto.name) || node.name;
            if (!Decorators[nodeName] &&
                !Composites[nodeName] &&
                !Actions[nodeName] &&
                customNames.indexOf(nodeName) < 0) {
                var subdata = {};
                subdata.name = nodeName;
                subdata.title = (proto && proto.title) || node.title;
                subdata.category = node.category;

                customNames.push(nodeName);
                data.custom_nodes.push(subdata);
            }

            // store children/child
            if (node.category === COMPOSITE && node.children) {
                var children = [];
                for (var i = node.children.length - 1; i >= 0; i--) {
                    children.push(node.children[i].id);
                    stack.push(node.children[i]);
                }
                spec.children = children;
            } else if (node.category === DECORATOR && node.child) {
                stack.push(node.child);
                spec.child = node.child.id;
            }

            data.nodes[node.id] = spec;
        }

        return data;
    }

    /**
     * Propagates the tick signal through the tree, starting from the root.
     *
     * This method receives a target object of any type (Object, Array,
     * DOMElement, whatever) and a `Blackboard` instance. The target object has
     * no use at all for all Behavior3JS components, but surely is important
     * for custom nodes. The blackboard instance is used by the tree and nodes
     * to store execution variables (e.g., last node running) and is obligatory
     * to be a `Blackboard` instance (or an object with the same interface).
     *
     * Internally, this method creates a Tick object, which will store the
     * target and the blackboard objects.
     *
     * Note: BehaviorTree stores a list of open nodes from last tick, if these
     * nodes weren't called after the current tick, this method will close them
     * automatically.
     *
     * @method tick
     * @param {Object} target A target object.
     * @param {Blackboard} blackboard An instance of blackboard object.
     * @return {Constant} The tick signal state.
     **/
    tick(target, blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an ' +
            'instance of b3.Blackboard';
        }

        /* CREATE A TICK OBJECT */
        var tick = new Tick();
        tick.debug = this.debug;
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;

        /* TICK NODE */
        var state = this.root._execute(tick);

        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        var lastOpenNodes = blackboard.get('openNodes', this.id);
        var currOpenNodes = tick._openNodes.slice(0);

        // does not close if it is still open in this tick
        var start = 0;
        var i;
        for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i + 1;
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            }
        }

        // close the nodes
        for (i = lastOpenNodes.length - 1; i >= start; i--) {
            lastOpenNodes[i]._close(tick);
        }

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', currOpenNodes, this.id);
        blackboard.set('nodeCount', tick._nodeCount, this.id);

        return state;
    }
};
