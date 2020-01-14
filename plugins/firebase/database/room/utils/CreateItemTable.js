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
        .on('room.join', function (roomConfig) {
            itemTable
                .setRootPath(this.getItemTablePath(roomConfig.roomID))
                .startUpdate()
        }, this)
        .on('room.leave', function () {
            itemTable
                .clear()
                .stopUpdate()
        }, this)

    return itemTable;
}

export default CreateItemTable;