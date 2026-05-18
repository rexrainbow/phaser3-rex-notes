import TextEdit from './TextEdit';

var Edit = function(gameObject?: any, config?: any, onCloseCallback?: any) {
    if (!gameObject._edit) {
        gameObject._edit = new TextEdit(gameObject, {
            clickEnable: false
        });
    }
    gameObject._edit.open(config, onCloseCallback);
    return gameObject._edit;
}

export default Edit;