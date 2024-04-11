import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TextPage;

declare namespace TextPage {
    interface IConfig {
        text?: string | string[],
        maxLines?: number,
        pageBreak?: string,
    }
}

declare class TextPage extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextPage.IConfig
    );

    setMaxLines(maxLines: number): this;
    maxLines: number;

    setPageBreak(pageBreak?: string): this;
    pageBreak: string;

    setText(text: string | string[]): this;
    appendText(text: string | string[]): this;
    appendPage(text: string | string[]): this;
    clearText(): this;

    showPage(pageIndex?: number): this;
    showNextPage(): this;
    showPreviousPage(): this;
    showFirstPage(): this;
    showLastPage(): this;

    getPage(pageIndex?: number): string;
    getNextPage(): string;
    getPreviousPage(): string;
    getFirstPage(): string;
    getLastPage(): string;

    readonly isLastPage: boolean;
    readonly isFirstPage: boolean;

    readonly pageIndex: number;
    readonly pageCount: number;

    showPageByLineIndex(lineIndex: number): this;
    showNextLine(): this;
    showPreviousLine(): this;
    showFirstLine(): this;
    showLastLine(): this;

    getPageByLineIndex(lineIndex: number): string;
    getPageOfNextLine(): string;
    getPageOfPreviousLine(): string;
    getPageOfFirstLine(): string;
    getPageOfLastLine(): string;

    readonly isFirstLine: boolean;
    readonly isLastLine: boolean;

    readonly startLineIndex: number;
    readonly endLineIndex: number;
    readonly totalLinesCount: number;
}