import { CloseLastOpenEditor } from './LastOpenedEditor.js';

var Close = function () {
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