const GetValue = Phaser.Utils.Objects.GetValue;

var BuildVerticalTextSizer = function (parentSizer, config) {
    var title = GetValue(config, 'title', undefined);
    var separator = GetValue(config, 'separator', undefined);
    var text = GetValue(config, 'text', undefined);

    var separatorSpace = GetValue(config, 'space.separator', 0);

    var titleAlign = GetValue(config, 'align.title', 'left');
    var textAlign = GetValue(config, 'align.text', 'right');
    var titleProportion = GetValue(config, 'proportion.title', 0);
    var textProportion = GetValue(config, 'proportion.text', 0);

    if (title) {
        parentSizer.add(
            title,
            { align: titleAlign, proportion: titleProportion }
        );
    }

    if (separator) {
        var separatorProportion = GetValue(config, 'proportion.separator', 1);
        var padding = {
            left: (title) ? separatorSpace : 0,
            right: (text) ? separatorSpace : 0
        };
        parentSizer.add(
            separator,
            { proportion: separatorProportion, padding: padding }
        );
    } else {
        // Title aligns to left, text aligns to right, without separator
        if (
            title && (titleAlign === 'left') && (titleProportion === 0) &&
            text && (textAlign === 'right') && (textProportion === 0)
        ) {
            parentSizer.addSpace();
        }
    }

    if (text) {
        parentSizer.add(
            text,
            { align: textAlign, proportion: textProportion }
        );
    }

    return parentSizer;
}

export default BuildVerticalTextSizer;