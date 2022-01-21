import { COMPOSITE, DECORATOR } from '../../constants.js';
import * as Decorators from '../../decorators';
import * as Composites from '../../composites';
import * as Actions from '../../actions';

var Dump = function () {
    var data = {};
    var customNames = [];

    data.title = this.title;
    data.description = this.description;
    data.root = (this.root) ? this.root.id : null;
    data.properties = this.properties;
    data.nodes = {};
    data.custom_nodes = [];

    if (!this.root) {
        return data;
    }

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

export default Dump;