import Delete from '../utils/query/Delete.js';

var DeleteBoard = function (boardId, tag) {
    if (boardId === undefined) {
        boardId = this.boardID;
    }
    if (tag === undefined) {
        tag = this.tag;
    }

    var query = this.getRecordQuery(boardId, tag, undefined, undefined);
    return Delete(query);
}

export default DeleteBoard;