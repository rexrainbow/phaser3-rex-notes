export default {
    setBindingTarget(target) {
        this.panel.setBindingTarget(target);
        this.controlPoints.setBindingTarget(target);
        return this;
    },

    clearBindingTarget() {
        this.setBindingTarget();
        return this;
    }
}