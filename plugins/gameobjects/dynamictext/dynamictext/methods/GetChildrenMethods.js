const GetAll = Phaser.Utils.Array.GetAll;

export default {
    getChildren() {
        return this.children;
    },

    getActiveChildren() {
        return GetAll(this.children, 'active', true);
    },
};