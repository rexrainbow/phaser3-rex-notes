import ItemTable from '../../itemtable/ItemTable.js';
import GetValue from '../../../../utils/object/GetValue.js';

var CreateItemTable = function (config) {
    var itemTableConfig = GetValue(config, 'itemTable', false);
    if (!itemTableConfig) {
        return null;
    }

    itemTableConfig.eventEmitter = this.getEventEmitter();
    itemTableConfig.root = this.getItemTablePath()
    var itemTable = new ItemTable(itemTableConfig);

    this
        .on('room.join', function () {
            itemTable
                .startUpdate()
        })
        .on('room.leave', function () {
            itemTable
                .clear()
                .stopUpdate()
        })

    return itemTable;
}

export default CreateItemTable;