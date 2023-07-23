const GetValue = Phaser.Utils.Objects.GetValue;

var AddPanel = function (parent, config) {
    var panelConfig = GetValue(config, 'panel', undefined);
    var panel = GetValue(panelConfig, 'child');
    if (!panel) {
        return;
    }

    var expandX = GetValue(config, 'panel.expandX', true);
    var expandY = GetValue(config, 'panel.expandY', true);

    parent.add(panel,
        {
            column: 1,
            row: 1,
            align: 'center',
            expand: true,
            key: 'panel'
        }
    );
}

export default AddPanel;