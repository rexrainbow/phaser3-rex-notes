import GetEdgeData from './edge/GetEdgeData.js';
import IsEdge from './edge/IsEdge.js';
import AddEdge from './edge/AddEdge.js';
import RemoveEdge from './edge/RemoveEdge.js';
import GetAllEdges from './edge/GetAllEdges.js';
import GetEdgesOfNode from './edge/GetEdgesOfNode.js';
import GetEdgeLength from './edge/GetEdgeLength.js';
import IsInLoop from './edge/IsInLoop.js';

import GetNodeData from './node/GetNodeData.js';
import IsNode from './node/IsNode.js';
import AddNode from './node/AddNode.js';
import AddNodes from './node/AddNodes.js';
import RemoveNode from './node/RemoveNode.js';
import RemoveAllNodes from './node/RemoveAllNodes.js';
import GetAllNodes from './node/GetAllNodes.js';
import GetNodesOfEdge from './node/GetNodesOfEdge.js';
import GetOppositeNode from './node/GetOppositeNode.js';
import GetAllConnectedNodes from './node/GetAllConnectedNodes.js';

import GetNeighborNodes from './neighbors/GetNeighborNodes.js';
import AreNeighborNodes from './neighbors/AreNeighborNodes.js';

export default {
    getEdgeData: GetEdgeData,
    isEdge: IsEdge,
    addEdge: AddEdge,
    removeEdge: RemoveEdge,
    getAllEdges: GetAllEdges,
    getEdgesOfNode: GetEdgesOfNode,
    getEdgeLength: GetEdgeLength,
    isInLoop: IsInLoop,

    getNodeData: GetNodeData,
    isNode: IsNode,
    addNode: AddNode,
    addNodes: AddNodes,
    removeNode: RemoveNode,
    removeAllNodes: RemoveAllNodes,
    getAllNodes: GetAllNodes,
    getNodesOfEdge: GetNodesOfEdge,
    getOppositeNode: GetOppositeNode,
    getAllConnectedNodes: GetAllConnectedNodes,

    getNeighborNodes: GetNeighborNodes,
    areNeighborNodes: AreNeighborNodes,
}