import createChart from './createChart';

export default (id, data, label = id, color = 'blue') => {
    const context = document.querySelector(`#${id}`);
    const chart = createChart(context, data, label, color);

    return chart;
};
