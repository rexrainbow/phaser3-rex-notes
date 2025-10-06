export default {
    createNullNode() {
        return { $dummy: true, width: 0, height: 0, }
    },

    isNullNode(node) {
        return !!node.$dummy;
    },
}