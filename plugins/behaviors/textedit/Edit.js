import TextEdit from './TextEdit.js';

var Edit = function (gameObject, config) {
    if (!gameObject._edit) {
        gameObject._edit = new TextEdit(gameObject);
    }
    gameObject._edit.open(config);
    return gameObject._edit;
}

export default Edit;