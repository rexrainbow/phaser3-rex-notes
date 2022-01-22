import { BreadthFirstSearch } from './Traversal.js';
import * as Nodes from '../nodes';

var Dump = function () {
    var data = {};
    var customNames = [];

    data.title = this.title;
    data.description = this.description;
    data.root = (this.root) ? this.root.id : null;
    data.properties = this.properties;
    data.nodes = [];

    if (!this.root) {
        return data;
    }

    var nodes = [];
    BreadthFirstSearch(this.root, function (child) {
        nodes.push(child);
    })

    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
        var node = nodes[i];
        data.nodes.push(node.dump());
    }

    return data;
}

export default Dump;