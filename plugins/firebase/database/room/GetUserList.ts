import ItemList from '../utils/itemlist/ItemList';

var GetUserList = function(roomID?: any) {
    if (roomID === undefined) {
        return this.userList.getUsers();
    }

    var self = this;
    return new Promise(function(resolve?: any, reject?: any) {
        var userList = new ItemList({
            itemIDKey: 'joinAt',
            mode: 'once'
        })

        userList
            .once('update', function(users?: any) {
                resolve(users)
            })
            .startUpdate(self.getUserListRef(roomID));
    })
}

export default GetUserList;