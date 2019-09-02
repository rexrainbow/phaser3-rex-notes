import GetObjUID from '../obj/GetObjUID.js';
import UidToObj from '../obj/UidToObj.js';
import GetGraphData from '../obj/GetGraphData.js';
import DistanceBetween from '../../utils/math/distance/DistanceBetween.js';


const DIRAtoB = 1;
const DIRBtoA = 2;
const DIRMODE = {
    '->': DIRAtoB,
    '<-': DIRBtoA,
    '<->': (DIRAtoB | DIRBtoA),
};

export default {
    addEdge(edgeGO, vAGO, vBGO, dir) {
        var edgeUid = GetObjUID(edgeGO);
        var edge = this.GetEdge(edgeUid, true);
        edge.dir = dir;
        edge.vA = GetObjUID(vAGO);
        edge.vB = GetObjUID(vBGO);

        var vA = this.GetVertex(vAGO, true);
        var vB = this.GetVertex(vBGO, true);
        if (typeof (dir) === 'string') {
            dir = DIRMODE(dir);
        }
        if (dir & DIRAtoB) {
            vA[edgeUid] = true;
        }
        if (dir & DIRBtoA) {
            vB[edgeUid] = true;
        }
        return this;
    },

    removeEdge(gameObejct, destroy) {
        if (destroy === undefined) {
            destroy = false;
        }

        var uid = GetObjUID(gameObejct);
        if (!this.edges.hasOwnProperty(uid)) {
            return this;
        }

        // Remove edge
        delete this.edges[uid];
        // Clear reference of graph
        GetGraphData(gameObejct).setGraph(null);
        if (destroy && gameObejct.destroy) {
            gameObject.destroy();
        }
        return this;
    },

    getEdge(gameObejct, createIfNotExisted) {
        if (createIfNotExisted === undefined) {
            createIfNotExisted = false;
        }

        // uid or game object
        var uid = GetObjUID(gameObejct);
        if (createIfNotExisted && !this.edges.hasOwnProperty(uid)) {
            this.edges[uid] = {};
        }
        return this.edges[uid];
    },

    getEdgesOfVertex(vertexGameObject, out) {
        if (out === undefined) {
            out = [];
        }

        var vertex = this.getVertex(vertexGameObject);
        if (!vertex) {
            return out;
        }

        var edgeGO;
        for (var edgeUid in vertex) {
            edgeGO = UidToObj(edgeUid);
            if (edgeGO) {
                out.push(edgeGO);
            }
        }
        return out;
    },

    isEdge(gameObejct) {
        // uid or game object
        var uid = GetObjUID(gameObejct);
        return this.edges.hasOwnProperty(uid);
    },

    getEdgeLength(gameObejct) {
        var edge = this.getEdge(gameObejct);
        if (!edge) {
            return 0;
        }
        var vAGO = UidToObj(edge.vA);
        var vBGO = UidToObj(edge.vB);
        if ((!vAGO) || (!vBGO)) {
            return 0;
        }

        return DistanceBetween(vAGO.x, vAGO.y, vBGO.x, vBGO.y);
    },

    getAllEdges(out) {
        if (out === undefined) {
            out = [];
        }

        var edgeGO;
        for (var edgeUid in this.edges) {
            edgeGO = UidToObj(edgeUid);
            if (edgeGO) {
                out.push(edgeGO);
            }
        }
        return out;
    },
};