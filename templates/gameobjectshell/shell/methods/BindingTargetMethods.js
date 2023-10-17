export default {
    setBindingTarget(target) {
        if (this.bindingTarget) {
            this.bindingTarget.off('destroy', this.clearBindingTarget, this);
        }

        if (target) {
            target.on('destroy', this.clearBindingTarget, this);
        }

        this.bindingTarget = target;

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