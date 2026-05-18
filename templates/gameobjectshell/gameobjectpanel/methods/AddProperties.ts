var AddProperties = function(extraProperties?: any) {
    var formatCallback = function(value?: any) {
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
            onValueChange(newValue?: any, oldValue?: any, bindingTarget?: any, bindingKey?: any) {
                bindingTarget.setOrigin(newValue, bindingTarget.originY);
            }
        })
        .addInput({
            bindingKey: 'originY', title: 'originY',
            view: 'number', monitor: true, format: formatCallback,
            onValueChange(newValue?: any, oldValue?: any, bindingTarget?: any, bindingKey?: any) {
                bindingTarget.setOrigin(bindingTarget.originX, newValue);
            }
        })

    if (extraProperties?: any) {
        for (var i = 0, cnt = extraProperties.length; i < cnt; i++) {
            var propertyConfig = extraProperties[i];

            if (propertyConfig.format === undefined) {
                var view = propertyConfig.view;
                if ((view === undefined) || (view === 'number') || (view === 'range')) {
                    propertyConfig.format = formatCallback;
                }
            }

            this.addInput(propertyConfig)
        }
    }

    this.addButton({
        title: 'Object',
        label: 'Destroy',
        callback: function(target?: any) {
            target.destroy();
        },
    })

}

export default AddProperties;