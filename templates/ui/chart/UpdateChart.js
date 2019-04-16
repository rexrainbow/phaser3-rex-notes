var UpdateChart = function () {
    if (this.chart === undefined) {
        return this;
    }
    this.chart.update();
}
export default UpdateChart;