import CreateUUID from '../utils/CreateUUID.js';
import { COMPOSITE, DECORATOR } from '../constants.js';
import * as Decorators from '../decorators';
import * as Composites from '../composites';
import * as Actions from '../actions';
import Tick from './Tick.js';

class BehaviorTree {

    constructor() {

        this.id = CreateUUID();

        this.title = '';

        this.description = '';

        this.properties = {};

        this.root = null;

        this.debug = null;
    }

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

export default BehaviorTree;