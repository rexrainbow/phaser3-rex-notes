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

        var topmostPanel = this.panel.getTopmostParent();
        if (isVisible) {
            topmostPanel.show(this.panel);
        } else {
            topmostPanel.hide(this.panel);
        }
        topmostPanel.layout();

        this.controlPoints.setVisible(isVisible);
        return this;
    },

    clearBindingTarget() {
        this.setBindingTarget();
        return this;
    }
}