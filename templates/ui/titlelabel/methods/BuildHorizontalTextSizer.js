const GetValue = Phaser.Utils.Objects.GetValue;

var BuildHorizontalTextSizer = function (parentSizer, config) {
    var title = GetValue(config, 'title', undefined);
    var separator = GetValue(config, 'separator', undefined);
    var text = GetValue(config, 'text', undefined);

    var separatorSpace = GetValue(config, 'space.separator', 0);

    if (title) {
        var titleAlign = GetValue(config, 'align.title', 'right');
        var padding = {
            bottom: (!separator && text) ? separatorSpace : 0
        }
        parentSizer.add(
            title,
            { align: titleAlign }
        );
    }

    if (separator) {
        var padding = {
            top: (title) ? separatorSpace : 0,
            bottom: (text) ? separatorSpace : 0,
            left: GetValue(config, 'space.separatorLeft', 0),
            right: GetValue(config, 'space.separatorRight', 0),
        };
        parentSizer.add(
            separator,
            { expand: true, padding: padding }
        );
    }


    if (text) {
        var textAlign = GetValue(config, 'align.text', 'right');
        parentSizer.add(
            text,
            { align: textAlign }
        );
    }

    return parentSizer;
}

export default BuildHorizontalTextSizer;