import * as Nodes from '../../nodes/index.js';
import { GetSerialNumber, SetSerialNumber } from '../../utils/CreateID.js'

var HasOwnProperty = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

var Load = function (data, names) {
    var sn = data.sn;
    if (sn != null) {
        SetSerialNumber(Math.max(GetSerialNumber(), sn))
    }

    names = names || {};

    if (HasOwnProperty(data, 'id')) {
        this.id = data.id;
    }
    if (HasOwnProperty(data, 'title')) {
        this.title = data.title;
    }
    if (HasOwnProperty(data, 'description')) {
        this.description = data.description;
    }
    if (HasOwnProperty(data, 'properties')) {
        this.properties = data.properties;
    }

    var nodeData = data.nodes;
    var nodes = {};
    for (var i = nodeData.length - 1; i >= 0; i--) {
        // Create nodes from bottom to top
        var spec = nodeData[i],
            className = spec.name;

        var Cls;
        if (className in names) {
            // Look for the name in custom nodes
            Cls = names[className];
        } else if (className in Nodes) {
            // Look for the name in default nodes
            Cls = Nodes[className];
        } else {
            // Invalid node name
            throw new EvalError(`BehaviorTree.load: Invalid node name "${className}".`);
        }

        var config = {};
        if (HasOwnProperty(spec, 'children')) {
            config.children = spec.children;
        }
        if (HasOwnProperty(spec, 'child')) {
            config.child = spec.child;
        }
        if (HasOwnProperty(spec, 'services')) {
            config.services = spec.services;
        }

        if (HasOwnProperty(spec, 'id')) {
            config.id = spec.id;
        }
        config.name = spec.name;
        if (HasOwnProperty(spec, 'title')) {
            config.title = spec.title;
        }
        if (HasOwnProperty(spec, 'description')) {
            config.description = spec.description;
        }
        if (HasOwnProperty(spec, 'properties')) {
            config.properties = spec.properties;
        }
        if (HasOwnProperty(spec, 'expressions')) {
            config.expressions = spec.expressions;
        }

        var node = new Cls(config, nodes);
        nodes[node.id] = node;
    }

    this.root = nodes[data.root];

    return this;
}

export default Load;
