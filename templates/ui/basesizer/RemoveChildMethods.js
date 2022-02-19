export default {
    removeFromParentSizer() {
        var parent = this.getParentSizer();
        if (parent) {
            parent.remove(this);
        }
        return this;
    }
}