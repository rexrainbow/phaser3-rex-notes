// import * as Phaser from 'phaser';
import TitleLabel from '../titlelabel/TitleLabel';


export default TextBox;

declare namespace TextBox {

    interface IConfig extends TitleLabel.IConfig {
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
    stop(showAllText?: boolean): this;
    showLastPage(): this;
    pause(): this;
    resume(): this;
    isTyping: boolean;

    setTypeSpeed(speed: number): this;
    setTypingSpeed(speed: number): this;

    typeNextPage(): this;
    isLastPage: boolean;
    isFirstPage: boolean;
    pageIndex: number;
    pageCount: number;
}