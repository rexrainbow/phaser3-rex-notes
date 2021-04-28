const GetAll = Phaser.Utils.Array.GetAll;

export default {
    getChildren() {
        return this.children;
    },

    getValidChildren() {
        return GetAll(this.children, 'valid', true);
    }
};