var SetChartData = function (datasetIndex, dataIndex, value) {
    if (this.chart === undefined) {
        return this;
    }

    if (typeof (dataIndex) === 'string') {
        var labels = this.chart.data.labels;
        dataIndex = labels.indexOf(dataIndex);
    }

    var dataset;
    if (typeof (datasetIndex) === 'string') {
        var found = false;
        var datasets = this.chart.data.datasets;
        for (var i = 0, cnt = datasets.length; i < cnt; i++) {
            dataset = datasets[i];
            if (dataset.label === datasetIndex) {
                found = true;
                break;
            }
        }
        if (!found) {
            return this;
        }
    } else {
        dataset = this.chart.data.datasets[datasetIndex];
    }

    dataset.data[dataIndex] = value;
    return this;
};
export default SetChartData;
