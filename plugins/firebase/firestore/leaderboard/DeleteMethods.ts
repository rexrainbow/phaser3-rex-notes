import Delete from '../utils/query/Delete';

var Methods = {
    deleteUser(userID?: any) {
        if (userID === undefined) {
            userID = this.userID;
        }

        var query = this.getRecordQuery(undefined, undefined, userID, undefined);
        return Delete(query);
    },

    deleteBoard(boardID?: any, tag?: any) {
        if (boardID === undefined) {
            boardID = this.boardID;
        }
        if (tag === undefined) {
            tag = this.tag;
        }

        var query = this.getRecordQuery(boardID, tag, undefined, undefined);
        return Delete(query);
    }
}
export default Methods;