var AddProperties = function () {
    var formatCallback = function (value) {
        return (Number.isInteger(value)) ? value : value.toFixed(2);
    };

    this
        .addInput({
            bindingKey: 'x', title: 'x',
            view: 'number', monitor: true, format: formatCallback,
        })
        .addInput({
            bindingKey: 'y', title: 'y',
            view: 'number', monitor: true, format: formatCallback,
        })
        .addInput({
            bindingKey: 'displayWidth', title: 'width',
            view: 'number', monitor: true, format: formatCallback,
        })
        .addInput({
            bindingKey: 'displayHeight', title: 'height',
            view: 'number', monitor: true, format: formatCallback,
        })
        .addInput({
            bindingKey: 'angle', title: 'angle',
            view: 'number', monitor: true, format: formatCallback,
        })
        .addInput({
            bindingKey: 'originX', title: 'originX',
            view: 'number', monitor: true, format: formatCallback,
            onValueChange(newValue, oldValue, bindingTarget, bindingKey) {
                bindingTarget.setOrigin(newValue, bindingTarget.originY);
            }
        })
        .addInput({
            bindingKey: 'originY', title: 'originY',
            view: 'number', monitor: true, format: formatCallback,
            onValueChange(newValue, oldValue, bindingTarget, bindingKey) {
                bindingTarget.setOrigin(bindingTarget.originX, newValue);
            }
        })
        .addInput({
            bindingKey: 'alpha', title: 'alpha',
            view: 'range', min: 0, max: 1, monitor: true, format: formatCallback,
        })
}

export default AddProperties;