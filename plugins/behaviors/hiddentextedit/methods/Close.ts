import { CloseLastOpenEditor } from './LastOpenedEditor';

var Close = function() {
    // Already closed
    if (!this.isOpened) {
        return this;
    }

    CloseLastOpenEditor(this);

    this.setBlur();

    // 'blur' event -> OnOpen

    return this;
}

export default Close;