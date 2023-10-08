export default {
    setBindingTarget(target) {
        this.panel.setBindingTarget(target);
        this.controlPoints.setBindingTarget(target);

        var isVisible = !!target;
        this.panel.setVisible(isVisible);
        this.controlPoints.setVisible(isVisible);
        return this;
    },

    clearBindingTarget() {
        this.setBindingTarget();
        return this;
    }
}