import IsNode from './node/IsNode.js';
import AddNodeMethods from './node/AddNodeMethods.js';
import RemoveNodeMethods from './node/RemoveNodeMethods.js';
import GetNodeMethods from './node/GetNodeMethods.js';
import NeighborNodeMethods from './node/NeighborNodeMethods.js';
import NodeAttributeMethods from './node/NodeAttributeMethods.js';

import IsEdge from './edge/IsEdge.js';
import AddEdgeMethods from './edge/AddEdgeMethods..js';
import RemoveEdgeMethods from './edge/RemoveEdgeMethods.js';
import GetEdgeMethods from './edge/GetEdgeMethods.js';
import GetEdgeLength from './edge/GetEdgeLength.js';
import EdgeAttributeMethods from './edge/EdgeAttributeMethods.js';

var Methods = {
    isNode: IsNode,

    isEdge: IsEdge,
    getEdgeLength: GetEdgeLength,
}

Object.assign(
    Methods,
    AddNodeMethods,
    RemoveNodeMethods,
    GetNodeMethods,
    NeighborNodeMethods,
    NodeAttributeMethods,

    AddEdgeMethods,
    RemoveEdgeMethods,
    GetEdgeMethods,
    EdgeAttributeMethods,

)

export default Methods;