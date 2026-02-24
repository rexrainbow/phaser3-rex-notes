import GetValue from '../../../../../../plugins/utils/object/GetValue.js';

export default {
    setBindingTarget(target, bindingKey) {
        this.bindingTarget = target;

        if (arguments.length === 2) {
            this.setBindingTargetKey(bindingKey);
        }

        var items;
        if (!this.isRootTarget) {
            items = GetValue(target, bindingKey);
        } else {
            items = target;
        }
        this.setItems(items);

        return this;
    },

    setBindingTargetKey(bindingKey) {
        this.bindTargetKey = bindingKey;
        this.isRootTarget = (!bindingKey) || (bindingKey === '');
        return this;
    },
}
