var SetChildrenInteractiveEnable = function(enable?: any) {
    if (enable === undefined) {
        enable = true;
    }

    if (this.childrenInteractiveEnable !== enable) {
        this.lastOverChild = null;
    }

    this.childrenInteractiveEnable = enable;

    return this;
}

export default SetChildrenInteractiveEnable;