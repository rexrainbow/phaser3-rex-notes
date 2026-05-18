import AddNodeMethods from '../node/AddNodeMethods';
import RemoveNodeMethods from '../node/RemoveNodeMethods';
import GetNodeMethods from '../node/GetNodeMethods';
import NeighborNodeMethods from '../node/NeighborNodeMethods';
import NodeAttributeMethods from '../node/NodeAttributeMethods';

import AddEdgeMethods from '../edge/AddEdgeMethods.';
import RemoveEdgeMethods from '../edge/RemoveEdgeMethods';
import GetEdgeMethods from '../edge/GetEdgeMethods';
import GetEdgeLength from '../edge/GetEdgeLength';
import EdgeAttributeMethods from '../edge/EdgeAttributeMethods';

var Methods = {
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