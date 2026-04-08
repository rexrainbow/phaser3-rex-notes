// import * as Phaser from 'phaser';
import Canvas from '../canvas/Canvas';

export default Chart;

declare namespace Chart {
    /**
     * Dataset index or label name.
     */
    type IndexType = number | string;

    /**
     * Chart.js configuration object used to create the internal chart instance.
     *
     * This object is forwarded to `new Chart(context, config)` after the UI chart
     * injects canvas-specific options such as `responsive`, `maintainAspectRatio`,
     * animation redraw hooks, and optional `resolution`.
     */
    interface IConfig {
        /**
         * Canvas resolution passed to the base canvas object.
         */
        resolution?: number;
        /**
         * Additional Chart.js configuration fields.
         */
        [key: string]: any;
    }
}

/**
 * Canvas-based wrapper around a Chart.js chart instance.
 */
declare class Chart extends Canvas {
    /**
     * Create a chart game object.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The chart width.
     * @param height - The chart height.
     * @param config - Chart.js configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: Chart.IConfig
    );

    /**
     * Create or replace the internal Chart.js instance.
     * @param config - Chart.js configuration.
     * @returns This instance.
     */
    setChart(config: Chart.IConfig): this;

    /**
     * Get a dataset by numeric index or dataset label.
     * @param datasetIndex - Dataset index or label.
     * @returns The matched dataset, or `undefined` if not found.
     */
    getChartDataset(
        datasetIndex: Chart.IndexType
    ): { [key: string]: any } | undefined;

    /**
     * Get a data value from a dataset.
     * @param datasetIndex - Dataset index or label.
     * @param dataIndex - Data index or label name.
     * @returns The matched data value, or `undefined` if not found.
     */
    getChartData(
        datasetIndex: Chart.IndexType,
        dataIndex: Chart.IndexType
    ): number | undefined;

    /**
     * Set a data value in a dataset.
     * @param datasetIndex - Dataset index or label.
     * @param dataIndex - Data index or label name.
     * @param value - Value to assign.
     * @returns This instance.
     */
    setChartData(
        datasetIndex: Chart.IndexType,
        dataIndex: Chart.IndexType,
        value: number
    ): this;

    /**
     * Update the internal Chart.js instance.
     * @returns This instance.
     */
    updateChart(): this;

    /**
     * Underlying Chart.js instance.
     */
    chart: any;
}
