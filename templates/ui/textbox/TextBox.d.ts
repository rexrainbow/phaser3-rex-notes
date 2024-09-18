// import * as Phaser from 'phaser';
import TitleLabel from '../titlelabel/TitleLabel';


export default TextBox;

declare namespace TextBox {

    interface IConfig extends TitleLabel.IConfig {
        typingMode?: 0 | 1 | 'page' | 'line',

        page?: {
            maxLines?: number,
            pageBreak?: string,
        },

        type?: {
            speed?: number,
            typeMode?: 0 | 1 | 2 | 3 | 'left-to-right' | 'right-to-left' | 'middle-to-sides' | 'sides-to-middle',
            setTextCallback?: (text: string, isLastChar: boolean, insertIdx: number) => string;
            setTextCallbackScope?: object
        }
    }
}

declare class TextBox extends TitleLabel {
    constructor(
        scene: Phaser.Scene,
        config?: TextBox.IConfig
    );

    start(content: string, typingSpeed?: number): this;
    more(content: string, typingSpeed?: number): this;

    stop(showAllText?: boolean): this;
    showLastPage(): this;
    pause(): this;
    resume(): this;
    readonly isTyping: boolean;

    setTypeSpeed(speed: number): this;
    setTypingSpeed(speed: number): this;

    typeNextPage(): this;
    readonly isPageEnd: boolean;
    readonly isLastPage: boolean;
    readonly isFirstPage: boolean;
    readonly pageIndex: number;
    readonly pageCount: number;
}