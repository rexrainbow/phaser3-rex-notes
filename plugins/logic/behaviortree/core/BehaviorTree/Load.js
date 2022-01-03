import { COMPOSITE, DECORATOR } from '../../constants.js';
import * as Decorators from '../../decorators';
import * as Composites from '../../composites';
import * as Actions from '../../actions';

var Load = function (data, names) {
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

export default Load;