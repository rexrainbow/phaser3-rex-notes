import { BreadthFirstSearch } from './Traversal.js';
import { COMPOSITE, DECORATOR } from '../constants.js';
import Clone from '../../../utils/object/Clone.js';

var Dump = function () {
    var data = {
        title: this.title,
        description: this.description,
        root: (this.root) ? this.root.id : null,
        properties: this.properties,
        nodes: []
    };

    if (!this.root) {
        return data;
    }

    var nodes = [];
    BreadthFirstSearch(this.root, function (child) {
        nodes.push(child);
    })

    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var node = nodes[i];

        var spec = {
            id: node.id,
            name: node.name,
            title: node.title,
            description: node.description,
            properties: Clone(node.properties)
        };

        switch (node.category) {
            case COMPOSITE:
                spec.children = node.children.map((child) => child.id);
                break;

            case DECORATOR:
                if (node.child) {
                    spec.child = node.child.id;
                }
                break;
        }

        data.nodes.push(spec);
    }

    return data;
}

export default Dump;