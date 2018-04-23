export default (
    chart = null,
    data = [],
    label = 'unknown',
    color = 'black'
) => {
    if (!chart) return;
    const dataset = {
        borderColor: color,
        fill: false,
        pointRadius: 0,
        label,
        data
    };
    chart.data.datasets.push(dataset);
    chart.update();
};
