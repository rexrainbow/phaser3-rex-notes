import { SetLastOpenedEditor } from './LastOpenedEditor.js';
import CreateElement from './CreateElement.js';

var Open = function () {
    // Already opened
    if (this.isOpened) {
        return this;
    }
    // Read only
    if (this.readOnly) {
        return this;
    }

    SetLastOpenedEditor(this);

    if (!this.node) {
        // Create input text element when opening editor
        this.node = CreateElement(this, this.nodeConfig);
        // Register 'focus', 'blur' events
    }

    this.setFocus();

    // 'focus' event -> OnOpen

    return this;
}

export default Open;