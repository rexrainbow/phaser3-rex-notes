export default {
    createNullEdge() {
        return { $invisible: true };
    },

    isNullEdge(edge) {
        return !!edge.$invisible;
    },
}