const GetValue = Phaser.Utils.Objects.GetValue;

var AddPanel = function (parent, config) {
    var panelConfig = GetValue(config, 'panel', undefined);
    var panel = GetValue(panelConfig, 'gameObject');
    if (!panel) {
        return;
    }

    var expandPanel = GetValue(config, 'expand.panel', true);

    parent.add(panel,
        {
            column: 1,
            row: 1,
            align: 'center',
            expand: expandPanel,
            key: 'panel'
        }
    );
}

export default AddPanel;