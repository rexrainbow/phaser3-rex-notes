import ItemTable from '../../itemtable/ItemTable.js';
import GetValue from '../../../../utils/object/GetValue.js';

var CreateItemTable = function (config) {
    var itemTableConfig = GetValue(config, 'itemTable', false);
    if (!itemTableConfig) {
        return null;
    }

    itemTableConfig.eventEmitter = this.getEventEmitter();
    var itemTable = new ItemTable(itemTableConfig);

    this
        .on('room.join', function () {
            itemTable
                .setRootPath(this.getItemTablePath(roomConfig.roomID))
                .startReceiving()
        })
        .on('room.leave', function () {
            itemTable
                .clear()
                .stopReceiving()
        })

    return itemTable;
}

export default CreateItemTable;