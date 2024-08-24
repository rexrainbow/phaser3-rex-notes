(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextextpageplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.off('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }


            this.destroyEventEmitter();

            this.parent = undefined;
            this.scene = undefined;
            this.game = undefined;

            this.isShutdown = true;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods
    );

    const TextClass = Phaser.GameObjects.Text;

    var IsTextGameObject = function (gameObject) {
        return (gameObject instanceof TextClass);
    };

    const BitmapTextClass = Phaser.GameObjects.BitmapText;

    var IsBitmapTextGameObject = function (gameObject) {
        return (gameObject instanceof BitmapTextClass);
    };

    const TextType = 0;
    const TagTextType = 1;
    const BitmapTextType = 2;

    var GetTextObjectType = function (textObject) {
        var textObjectType;
        if (IsBitmapTextGameObject(textObject)) {
            textObjectType = BitmapTextType;
        } else if (IsTextGameObject(textObject)) {
            textObjectType = TextType;
        } else {
            textObjectType = TagTextType;
        }

        return textObjectType;
    };

    var TextToLines = function (textObject, text, lines) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                lines = textObject.getWrappedText(text); // Array of string
                break;
            case TagTextType:
                lines = textObject.getPenManager(text, lines); // Pens-manager
                break;
            case BitmapTextType:
                if (textObject.maxWidth > 0) {
                    lines = textObject.setText(text).getTextBounds().wrappedText.split('\n');
                } else {
                    lines = text.split('\n');
                }

                break;
        }
        return lines;
    };

    var TextHeightToLinesCount = function (textObject) {
        var textObjectType = GetTextObjectType(textObject);
        var height, lineSpacing, lineHeight;
        switch (textObjectType) {
            case TextType:
            case TagTextType:
                height = textObject.height - textObject.padding.top - textObject.padding.bottom;
                lineSpacing = textObject.lineSpacing;
                lineHeight = textObject.style.metrics.fontSize + textObject.style.strokeThickness;
                break;

            case BitmapTextType:
                height = textObject.height;
                lineSpacing = 0;
                var scale = (textObject.fontSize / textObject.fontData.size);
                lineHeight = textObject.fontData.lineHeight * scale;
                break;
        }

        // height = (lines * (lineHeight + lineSpacing)) - lineSpacing
        return (height - lineSpacing) / (lineHeight + lineSpacing);

    };

    var GetLines = function (startLineIndex, endLineIdx) {
        if (startLineIndex === undefined) {
            startLineIndex = this.startLineIndex;
        }
        if (endLineIdx === undefined) {
            var pageLinesCount = this.pageLinesCount;
            if (pageLinesCount > 0) {
                endLineIdx = startLineIndex + pageLinesCount;
            } else {
                endLineIdx = this.totalLinesCount;
            }
        }
        if (endLineIdx > this.totalLinesCount) {
            endLineIdx = this.totalLinesCount;
        }

        var text;
        switch (this.textObjectType) {
            case TextType:
            case BitmapTextType:
                text = this.lines.slice(startLineIndex, endLineIdx).join('\n');
                break;
            case TagTextType:
                var startIdx = this.lines.getLineStartIndex(startLineIndex);
                var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
                text = this.lines.getSliceTagText(startIdx, endIdx, true);

                // Check line count
                var newLineCharCount = (text.match(/\n/g) || []).length;
                if (newLineCharCount > (endLineIdx - startLineIndex - 1)) {
                    // Remove last '\n'
                    text = text.substring(0, text.length - 1);
                }

                break;
        }

        return text;
    };

    var GetString = function (value) {
        if (value == null) {
            value = '';
        } else if (Array.isArray(value)) {
            value = value.join('\n');
        } else if (typeof (value) === 'number') {
            value = value.toString();
        }
        return value;
    };

    var SetContentMethods = {
        clearText() {
            this.sections.length = 0;
            this.pageStartIndexes.length = 0;
            this.lines.length = 0;

            return this;
        },

        appendPage(text) {
            var pageStartIndex = this.totalLinesCount;

            this.sections.push(GetString(text));
            var text = this.sections.join('\n');
            this.lines = TextToLines(this.parent, text, this.lines);

            var newLinesCount = this.totalLinesCount - pageStartIndex;
            var pageLinesCount = this.pageLinesCount;
            var pageCount;
            if (pageLinesCount > 0) {
                pageCount = Math.ceil(newLinesCount / this.pageLinesCount);
            } else {  // Height of Text object might be 0
                pageCount = 1;
            }

            for (var i = 0; i < pageCount; i++) {
                this.pageStartIndexes.push(
                    pageStartIndex + (i * this.pageLinesCount)
                );
            }

            return this;
        },

        setText(text, resetIndex) {
            if (resetIndex === undefined) {
                resetIndex = true;
            }

            if (resetIndex) {
                this.resetIndex();
            }

            this.clearText();

            var sections = GetString(text).split(this.pageBreak);
            // if (sections[sections.length - 1] === '') { // Last section is an empty string
            //     sections.length -= 1;
            // }

            for (var i = 0, cnt = sections.length; i < cnt; i++) {
                this.appendPage(sections[i]);
            }

            return this;
        },

        appendText(text) {
            var content = this.content + GetString(text);
            this.setText(content, false);
            return this;
        },


    };

    const Clamp = Phaser.Math.Clamp;

    var GetPageMethods = {

        resetIndex() {
            this.pageIndex = -1;
            this.startLineIndex = -1;
            this.endLineIndex = undefined;
            return this;
        },

        setPageIndex(idx) {
            idx = Clamp(idx, 0, this.lastPageIndex);
            this.pageIndex = idx;
            this.startLineIndex = this.pageStartIndexes[idx];
            this.endLineIndex = this.pageStartIndexes[idx + 1];
            return this;
        },

        getPage(idx) {
            if (idx === undefined) {
                idx = this.pageIndex;
            }

            return this.setPageIndex(idx).getLines(this.startLineIndex, this.endLineIndex);
        },

        getNextPage() {
            return this.getPage(this.pageIndex + 1);
        },

        getPreviousPage() {
            return this.getPage(this.pageIndex - 1);
        },

        getFirstPage() {
            return this.getPage(0);
        },

        getLastPage() {
            return this.getPage(this.lastPageIndex);
        },

        setStartLineIndex(idx) {
            var lastStartLineIndex = Math.max(this.totalLinesCount - this.pageLinesCount, 0);
            idx = Clamp(idx, 0, lastStartLineIndex);

            this.startLineIndex = idx;
            this.endLineIndex = idx + this.pageLinesCount;
            return this;
        },

        getPageByLineIndex(idx) {
            return this.setStartLineIndex(idx).getLines(this.startLineIndex, this.endLineIndex);
        },

        getPageOfNextLine() {
            return this.getPageByLineIndex(this.startLineIndex + 1);
        },

        getPageOfPreviousLine() {
            return this.getPageByLineIndex(this.startLineIndex - 1);
        },

        getPageOfFirstLine() {
            return this.getPageByLineIndex(0);
        },

        getPageOfLastLine() {
            return this.getPageByLineIndex(this.totalLinesCount);
        },

    };

    var SetNoWrapText = function (textObject, text) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                // Store wrap properties
                var style = textObject.style;
                var wordWrapWidth = style.wordWrapWidth;
                var wordWrapCallback = style.wordWrapCallback;
                // Disable wrap
                style.wordWrapWidth = 0;
                style.wordWrapCallback = undefined;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wordWrapWidth = wordWrapWidth;
                style.wordWrapCallback = wordWrapCallback;
                break;

            case TagTextType:
                // Store wrap properties
                var style = textObject.style;
                var wrapMode = style.wrapMode;
                // Disable wrap
                style.wrapMode = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wrapMode = wrapMode;
                break;

            case BitmapTextType:
                // Store wrap properties
                var maxWidth = textObject._maxWidth;
                // Disable wrap
                textObject._maxWidth = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                textObject._maxWidth = maxWidth;
                break;
        }
    };

    var ShowMethods = {
        showPage(idx) {
            this.displayText(
                this.getPage(idx)
            );
            return this;
        },

        showNextPage() {
            this.displayText(
                this.getNextPage()
            );
            return this;
        },

        showPreviousPage() {
            this.displayText(
                this.getPreviousPage()
            );
            return this;
        },

        showFirstPage() {
            this.displayText(
                this.getFirstPage()
            );
            return this;
        },

        showLastPage() {
            this.displayText(
                this.getLastPage()
            );
            return this;
        },

        show() {
            this.displayText(
                this.getLines()
            );
            return this;
        },

        showPageByLineIndex(lineIndex) {
            this.displayText(
                this.getPageByLineIndex(lineIndex)
            );
            return this;
        },

        showNextLine() {
            this.displayText(
                this.getPageOfNextLine()
            );
            return this;
        },

        showPreviousLine() {
            this.displayText(
                this.getPageOfPreviousLine()
            );
            return this;
        },

        showFirstLine() {
            this.displayText(
                this.getPageOfFirstLine()
            );
            return this;
        },

        showLastLine() {
            this.displayText(
                this.getPageOfLastLine()
            );
            return this;
        },

        displayText(text) {
            SetNoWrapText(this.parent, text);
        }
    };

    var Methods = {   
        getLines: GetLines,
    };

    Object.assign(
        Methods,
        SetContentMethods,
        GetPageMethods,
        ShowMethods
    );

    const GetValue = Phaser.Utils.Objects.GetValue;
    Phaser.Math.Clamp;

    class TextPage extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.textObjectType = GetTextObjectType(this.parent);

            this.pageStartIndexes = [];

            // Text object : array of string
            // Tag text object : pens-manager
            // Bitmap text object : array of string
            this.lines = TextToLines(this.parent, '');

            this.sections = [];

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setMaxLines(GetValue(o, 'maxLines', undefined));
            this.setPageBreak(GetValue(o, 'pageBreak', '\f\n'));
            this.setText(GetValue(o, 'text', ''));

            this.startLineIndex = GetValue(o, 'start', -1);
            this.endLineIndex = GetValue(o, 'end', undefined);

            var pageIndex = GetValue(o, 'page');
            if (pageIndex === undefined) {
                this.resetIndex();
            } else {
                this.setPageIndex(pageIndex);
            }

            return this;
        }

        toJSON() {
            return {
                maxLines: this.maxLines,
                text: this.content,
                start: this.startLineIndex,
                end: this.endLineIndex,
                page: this.pageIndex,
                pageBreak: this.pageBreak
            };
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            switch (this.textObjectType) {
                case TextType:
                    this.lines.length = 0;
                    break;
                case TagTextType:
                    this.lines.destroy();
                    break;
                case BitmapTextType:
                    this.lines.length = 0;
                    break;
            }

            this.pageStartIndexes.length = 0;
            this.sections.length = 0;

            this.lines = undefined;
            this.pageStartIndexes = undefined;
            this.sections = undefined;

            super.shutdown(fromScene);
        }

        setMaxLines(maxLines) {
            this.maxLines = maxLines;
            return this;
        }

        setPageBreak(pageBreak) {
            this.pageBreak = pageBreak;
            return this;
        }

        get pageCount() {
            return this.pageStartIndexes.length;
        }

        get lastPageIndex() {
            return this.pageCount - 1;
        }

        get isFirstPage() {
            return (this.pageIndex <= 0);
        }

        get isLastPage() {
            return (this.pageIndex >= (this.pageCount - 1));
        }

        get totalLinesCount() {
            return (this.lines) ? this.lines.length : 0;
        }

        get pageLinesCount() {
            // Since the line height of each line is the same, 
            // each page will have the same number of lines

            if (this.maxLines !== undefined) {
                return this.maxLines;

            } else {
                var count;
                switch (this.textObjectType) {
                    case TextType:
                    case TagTextType:
                        var maxLines = this.parent.style.maxLines;
                        if (maxLines > 0) {
                            count = maxLines;
                        } else {
                            count = Math.floor(TextHeightToLinesCount(this.parent));
                        }
                        break;
                    case BitmapTextType:
                        count = this.totalLinesCount;
                        break;
                }
                return count;

            }
        }

        get isFirstLine() {
            return (this.startLineIndex <= 0);
        }

        get isLastLine() {
            return this.endLineIndex === this.totalLinesCount;
        }

        get content() {
            return this.sections.join(this.pageBreak);
        }
    }

    Object.assign(
        TextPage.prototype,
        Methods,
    );

    class TextPagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new TextPage(gameObject, config);
        }

    }

    return TextPagePlugin;

}));
