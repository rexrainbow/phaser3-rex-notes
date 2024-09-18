import TextPage from '../textpage/TextPage.js';
import TextTyping from '../texttyping/TextTyping.js';
import {
    TextType, TagTextType, BitmapTextType
} from '../../../plugins/utils/text/GetTextObjectType.js';

import GetTextObjectType from '../../../plugins/utils/text/GetTextObjectType.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TextBoxBase = function (GOClass, type) {
    if (type === undefined) {
        type = 'rexTextBox';
    }
    class TextBox extends GOClass {
        constructor(scene, config) {
            super(scene, config);
            this.type = type;
            this.isRunning = false;
            this._isPageEnd = false;

            // childrenMap must have 'text' element
            var text = this.childrenMap.text;

            // Expand text size
            var expandTextWidth = GetValue(config, 'expandTextWidth', false);
            var expandTextHeight = GetValue(config, 'expandTextHeight', false);
            if (expandTextWidth || expandTextHeight) {
                var textObjectType = GetTextObjectType(text);
                switch (textObjectType) {
                    case TextType:
                    case TagTextType:
                        // Don't overwrite resize method if text has it already
                        text.resize = function (width, height) {
                            var fixedWidth = (expandTextWidth) ? width : 0;
                            var fixedHeight = (expandTextHeight) ? height : 0;
                            text.setFixedSize(fixedWidth, fixedHeight);

                            if (fixedWidth > 0) {
                                text.setWordWrapWidth(fixedWidth);
                            }
                        }

                        if (textObjectType === TagTextType) {
                            var style = text.style;
                            if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
                                style.wrapMode = 1;
                            }
                        }
                        break;

                }

                if (expandTextWidth) {
                    text._minWidth = 0;
                }
                if (expandTextHeight) {
                    text._minHeight = 0;
                }
            }

            // Build typing and page behaviors
            this.setTypingMode(GetValue(config, 'typingMode', 'page'));
            this.page = new TextPage(text, GetValue(config, 'page', undefined));
            this.typing = new TextTyping(text, GetValue(config, 'typing', config.type));
            this.typing
                .on('complete', this.onTypingComplete, this)
                .on('type', this.onType, this)
                .on('typechar', this.onTypeChar, this)

            // Run layout again when size of text game object has changed
            this.textWidthSave = text.width;
            this.textHeightSave = text.height;
        }

        setTypingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TypingMode[mode];
            }
            this.typingMode = mode;
            return this;
        }

        start(text, speed) {
            if (speed !== undefined) {
                this.setTypingSpeed(speed);
            }

            // Start typing task
            this.isRunning = true;

            this.page.setText(text);

            this.emit('start');

            if (this.typingMode === 0) {
                // Typing page by page
                this.typeNextPage();
            } else {
                // Typing line by line
                this.typeNextLine();
            }
            return this;
        }

        more(text, speed) {
            if (speed !== undefined) {
                this.setTypingSpeed(speed);
            }

            if (this.isRunning) {
                this.page.appendText(text);
                this.typing.appendText(text);

            } else {
                this.isRunning = true;

                this.page.appendText(text);

                this.emit('start');

                if (this.typingMode === 0) {
                    this._isPageEnd = false;
                    var txt = this.page.getPage();
                    var startIndex = this.typing.textLength;
                    this.typing.start(txt, undefined, startIndex);

                } else {
                    // Typing line by line : Not support yet
                }
                return this;
            }
        }

        typeNextPage() {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            if (!this.isLastPage) {
                this._isPageEnd = false;
                var txt = this.page.getNextPage();
                this.typing.start(txt);

            } else {
                this.emit('complete');

            }
            return this;
        }

        typeNextLine() {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            if (!this.isLastLine) {
                var txt = this.page.getPageOfNextLine();

                var startLineIndex;
                if (this.isFirstLine) {
                    // Typing from 1st line
                    startLineIndex = 0;
                } else {
                    // Typing last line
                    startLineIndex = this.page.pageLinesCount - 1;
                }
                this.typing.startFromLine(txt, startLineIndex);

            } else {
                // Stop typing tasl if typing complete at last line

                this.isRunning = false;
                this.emit('pageend');
                this.emit('complete');

            }
        }

        pause() {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            if (this.isTyping) {
                this.typing.pause();
                this.emit('pause');
            }
            return this;
        }

        resume() {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            if (!this.isTyping) {
                this.emit('resume');
                this.typing.resume();
            }
            return this;
        }

        stop(showAllText) {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            this.typing.stop(showAllText);
            return this;
        }

        showLastPage() {
            // Do nothing if typing task does not start
            if (!this.isRunning) {
                return this;
            }

            this.typing.stop();
            if (this.typingMode === 0) {
                this.page.showLastPage();
            } else {
                this.page.showLastLine();
            }
            this.emit('type');
            this.onTypingComplete();
            return this;
        }

        setTypeSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        setTypingSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        get isTyping() {
            return this.typing.isTyping;
        }

        get isPageEnd() {
            return this._isPageEnd;
        }

        get isLastPage() {
            return this.page.isLastPage;
        }

        get isFirstPage() {
            return this.page.isFirstPage;
        }

        get pageCount() {
            return this.page.pageCount;
        }

        get pageIndex() {
            return this.page.pageIndex;
        }

        get isLastLine() {
            return this.page.isLastLine;
        }

        get isFirstLine() {
            return this.page.isFirstLine;
        }

        get lineCound() {
            return this.page.totalLinesCount;
        }

        get startLineIndex() {
            return this.page.startLineIndex;
        }

        get endLineIndex() {
            return this.page.endLineIndex;
        }

        get typingSpeed() {
            return this.typing.speed;
        }

        onType() {
            var text = this.childrenMap.text;
            if ((this.textWidthSave !== text.width) || (this.textHeightSave !== text.height)) {
                this.textWidthSave = text.width;
                this.textHeightSave = text.height;
                this.getTopmostSizer().layout();
            }
            this.emit('type');
        }

        onTypeChar(char) {
            this.emit('typechar', char);
        }

        onTypingComplete() {
            if (this.typingMode === 0) {
                this._isPageEnd = true;
                var isLastPage = this.isLastPage;

                // Stop typing tasl if typing complete at last page
                this.isRunning = !isLastPage;

                this.emit('pageend');
                /*
                Might enter this method immediately, if invoking typeNextPage() in this 'pageend' event.
                */

                if (isLastPage) {
                    this.emit('complete');
                }

            } else {
                // Typing next line continually
                this.typeNextLine();

            }

        }

    }

    return TextBox;
}

const TypingMode = {
    page: 0,
    line: 1
}

export default TextBoxBase;