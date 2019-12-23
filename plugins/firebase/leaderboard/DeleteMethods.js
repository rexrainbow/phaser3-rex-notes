import Delete from '../utils/query/Delete.js';

var Methods = {
    deleteUserScores(userID) {
        if (userID === undefined) {
            userID = this.userInfo.userID;
        }

        var query = this.getRecordQuery(undefined, undefined, userID, undefined);
        return Delete(query);
    },

    deleteBoard(boardId, tag) {
        if (boardId === undefined) {
            boardId = this.boardID;
        }
        if (tag === undefined) {
            tag = this.tag;
        }

        var query = this.getRecordQuery(boardId, tag, undefined, undefined);
        return Delete(query);
    }
}
export default Methods;