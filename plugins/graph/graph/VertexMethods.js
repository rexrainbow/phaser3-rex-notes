import GetObjUID from '../obj/GetObjUID.js';
import UidToObj from '../obj/UidToObj.js';

export default {
    addVertex(gameObejct) {
        this.getVertex(gameObejct, true);
        return this;
    },

    removeVertex(gameObejct, destroy, removeEdge) {
        if (destroy === undefined) {
            destroy = false;
        }
        if (removeEdge === undefined) {
            removeEdge = true;
        }

        var uid = GetObjUID(gameObejct);
        if (!this.vertices.hasOwnProperty(uid)) {
            return this;
        }

        // Remove connected edges
        if (removeEdge) {
            var vertex = this.getVertex(uid);
            for (var edgeUid in vertex) {
                this.removeEdge(edgeUid, destroy);
            }
        }
        // Remove vertex
        delete this.vertices[uid];
        // Clear reference of graph
        GetGraphData(gameObejct).setGraph(null);
        if (destroy && gameObejct.destroy) {
            gameObject.destroy();
        }

        return this;
    },

    removeAllVertices(destroy) {
        for (var vertexUid in this.vertices) {
            this.removeVertex(vertexUid, destroy)
        }
        return this;
    },

    isVertex(gameObejct) {
        // uid or game object
        var uid = GetObjUID(gameObejct);
        return this.vertices.hasOwnProperty(uid);
    },

    getVertex(gameObejct, createIfNotExisted) {
        if (createIfNotExisted === undefined) {
            createIfNotExisted = false;
        }

        // uid or game object
        var uid = GetObjUID(gameObejct);
        if (createIfNotExisted && !this.vertices.hasOwnProperty(uid)) {
            this.vertices[uid] = {};
        }
        return this.vertices[uid];
    },

    getOppositeVertex(vertexGameObject, edgeGameObject) {
        // uid or game object
        var edge = this.getEdge(edgeGameObject);
        if (!edge) {
            return undefined;
        }

        var vertexUid = GetObjUID(vertexGameObject);
        var oppositeVertexUid;
        if (vertexUid === edge.vA) {
            oppositeVertexUid = edge.vB;
        } else if (vertexUid === edge.vB) {
            oppositeVertexUid = edge.vA;
        }
        return UidToObj(oppositeVertexUid);
    },

    getVerticesOfEdge(edgeGameObject, out) {
        if (out === undefined) {
            out = [];
        }

        // uid or game object
        var edge = this.getEdge(edgeGameObject);
        if (!edge) {
            return out;
        }

        var vGO;
        vGO = UidToObj(edge.vA);
        if (vGO) {
            out.push(vGO);
        }
        vGO = UidToObj(edge.vB);
        if (vGO) {
            out.push(vGO);
        }
        return out;
    },

    getNeighborVertices(gameObject, out) {
        if (out === undefined) {
            out = [];
        }

        var vertex = this.getVertex(gameObject),
            vGO;
        if (vertex) {
            for (var edgeUid in vertex) {
                vGO = this.getOppositeVertex(gameObject, edgeUid);
                if (vGO) {
                    out.push(vGO);
                }
            }
        }
        return out;
    },

    getAllVertices(out) {
        if (out === undefined) {
            out = [];
        }

        var vGO;
        for (var vUid in this.vertices) {
            vGO = UidToObj(vUid);
            if (vGO) {
                out.push(vGO);
            }
        }
        return out;
    },
}