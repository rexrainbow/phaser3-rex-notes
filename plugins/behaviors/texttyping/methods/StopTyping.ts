import GetTypingString from '../utils/GetTypingString';

var StopTyping = function(showAllText?: any) {
    var timer = this.getTimer();
    if (timer?: any) {
        this.freeTimer();
    }
    if (showAllText?: any) {
        // Fire 'type' event for remainder characters until lastChar
        while (!this.isLastChar) {
            GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);
            this.emit('typechar', this.insertChar);
            this.typingIndex++;
        }
        // Display all characters on text game object
        this.setText(this.text);
        this.emit('type');
        this.emit('complete', this, this.parent);
    }

    return this;
}

export default StopTyping;