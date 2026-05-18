import GetValue from '../../../../../../plugins/utils/object/GetValue';

export default {
    setBindingTarget(target?: any, bindingKey?: any) {
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

    setBindingTargetKey(bindingKey?: any) {
        this.bindTargetKey = bindingKey;
        this.isRootTarget = (!bindingKey) || (bindingKey === '');
        return this;
    },
}