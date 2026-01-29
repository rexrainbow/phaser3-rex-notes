import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TextPage;

declare namespace TextPage {
    /**
     * Configuration for the TextPage component.
     */
    interface IConfig {
        /**
         * Initial text content.
         */
        text?: string | string[],
        /**
         * Maximum lines per page.
         */
        maxLines?: number,
        /**
         * Page break string.
         */
        pageBreak?: string,
    }
}

/**
 * Paginate and navigate text content by pages or lines.
 */
declare class TextPage extends ComponentBase {
    /**
     * @param gameObject - Target game object.
     * @param config - Optional configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TextPage.IConfig
    );

    /**
     * Set the maximum lines per page.
     *
     * @param maxLines - Maximum lines per page.
     * @returns This TextPage instance.
     */
    setMaxLines(maxLines: number): this;
    /**
     * Maximum lines per page.
     */
    maxLines: number;

    /**
     * Set the page break string.
     *
     * @param pageBreak - Page break string.
     * @returns This TextPage instance.
     */
    setPageBreak(pageBreak?: string): this;
    /**
     * Page break string.
     */
    pageBreak: string;

    /**
     * Replace all text content.
     *
     * @param text - Text content.
     * @returns This TextPage instance.
     */
    setText(text: string | string[]): this;
    /**
     * Append text content.
     *
     * @param text - Text content.
     * @returns This TextPage instance.
     */
    appendText(text: string | string[]): this;
    /**
     * Append a new page of text.
     *
     * @param text - Text content.
     * @returns This TextPage instance.
     */
    appendPage(text: string | string[]): this;
    /**
     * Clear all text content.
     *
     * @returns This TextPage instance.
     */
    clearText(): this;

    /**
     * Show a page by index.
     *
     * @param pageIndex - Page index, starting at 0.
     * @returns This TextPage instance.
     */
    showPage(pageIndex?: number): this;
    /**
     * Show the next page.
     *
     * @returns This TextPage instance.
     */
    showNextPage(): this;
    /**
     * Show the previous page.
     *
     * @returns This TextPage instance.
     */
    showPreviousPage(): this;
    /**
     * Show the first page.
     *
     * @returns This TextPage instance.
     */
    showFirstPage(): this;
    /**
     * Show the last page.
     *
     * @returns This TextPage instance.
     */
    showLastPage(): this;

    /**
     * Get a page by index.
     *
     * @param pageIndex - Page index, starting at 0.
     * @returns Page content.
     */
    getPage(pageIndex?: number): string;
    /**
     * Get the next page content.
     *
     * @returns Page content.
     */
    getNextPage(): string;
    /**
     * Get the previous page content.
     *
     * @returns Page content.
     */
    getPreviousPage(): string;
    /**
     * Get the first page content.
     *
     * @returns Page content.
     */
    getFirstPage(): string;
    /**
     * Get the last page content.
     *
     * @returns Page content.
     */
    getLastPage(): string;

    /**
     * Whether current page is the last page.
     */
    readonly isLastPage: boolean;
    /**
     * Whether current page is the first page.
     */
    readonly isFirstPage: boolean;

    /**
     * Current page index.
     */
    readonly pageIndex: number;
    /**
     * Total number of pages.
     */
    readonly pageCount: number;
    /**
     * Current page height in pixels.
     */
    readonly pageHeight: number;

    /**
     * Show a page by line index.
     *
     * @param lineIndex - Line index, starting at 0.
     * @returns This TextPage instance.
     */
    showPageByLineIndex(lineIndex: number): this;
    /**
     * Show the next line.
     *
     * @returns This TextPage instance.
     */
    showNextLine(): this;
    /**
     * Show the previous line.
     *
     * @returns This TextPage instance.
     */
    showPreviousLine(): this;
    /**
     * Show the first line.
     *
     * @returns This TextPage instance.
     */
    showFirstLine(): this;
    /**
     * Show the last line.
     *
     * @returns This TextPage instance.
     */
    showLastLine(): this;

    /**
     * Get a page by line index.
     *
     * @param lineIndex - Line index, starting at 0.
     * @returns Page content.
     */
    getPageByLineIndex(lineIndex: number): string;
    /**
     * Get the page content for the next line.
     *
     * @returns Page content.
     */
    getPageOfNextLine(): string;
    /**
     * Get the page content for the previous line.
     *
     * @returns Page content.
     */
    getPageOfPreviousLine(): string;
    /**
     * Get the page content for the first line.
     *
     * @returns Page content.
     */
    getPageOfFirstLine(): string;
    /**
     * Get the page content for the last line.
     *
     * @returns Page content.
     */
    getPageOfLastLine(): string;

    /**
     * Whether current line is the first line.
     */
    readonly isFirstLine: boolean;
    /**
     * Whether current line is the last line.
     */
    readonly isLastLine: boolean;

    /**
     * Start line index of the current page.
     */
    readonly startLineIndex: number;
    /**
     * End line index of the current page.
     */
    readonly endLineIndex: number;
    /**
     * Total number of lines.
     */
    readonly totalLinesCount: number;
}
