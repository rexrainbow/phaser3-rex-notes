var SetChartData = function(datasetIndex?: any, dataIndex?: any, value?: any) {
    if (this.chart === undefined) {
        return this;
    }

    var dataset = this.getChartDataset(datasetIndex);
    if (typeof (dataIndex) === 'string') {
        var labels = this.chart.data.labels;
        dataIndex = labels.indexOf(dataIndex);
        if (dataIndex === -1) {
            return this;
        }
    }
    dataset.data[dataIndex] = value;
    return this;
};
export default SetChartData;