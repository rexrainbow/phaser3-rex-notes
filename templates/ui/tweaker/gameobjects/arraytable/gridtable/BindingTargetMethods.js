import GetValue from '../../../../../../plugins/utils/object/GetValue.js';

export default {
    setBindingTarget(target, bindingKey) {
        this.bindingTarget = target;

        if (bindingKey !== undefined) {
            this.setBindingTargetKey(bindingKey);
        }

        var items = GetValue(target, bindingKey);
        this.setItems(items);

        return this;
    },

    setBindingTargetKey(bindingKey) {
        this.bindTargetKey = bindingKey;
        return this;
    },
}
