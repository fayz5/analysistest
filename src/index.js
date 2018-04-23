import getData from './utils/getData';
import renderChart from './utils/renderChart';
import getBollingerData from './indicators/boilinger';
import getRSIData from './indicators/rsa';
import updateChart from './utils/updateChart';
import processData from './utils/processData';

const PERIOD = 20;

document.addEventListener('DOMContentLoaded', () => {
    getData('data/Oslo_STL.json').then((res) => {
        const data = processData(res.data);
        const chart = renderChart('STL', data.slice(PERIOD - 1));
        // Calculate plot lines for Bollinger bands
        const bollinger = getBollingerData(data, PERIOD);

        // Render bollinger bands and update chart
        updateChart(chart, bollinger.sma, `${PERIOD}-period SMA`);
        updateChart(chart, bollinger.lowerBand, 'SMA - STDEV * 2', 'lime');
        updateChart(chart, bollinger.upperBand, 'SMA + STDEV * 2', 'red');

        // Calculate and render RSI
        const rsi = getRSIData(data);
        renderChart('RSISTL', rsi, 'RSI(14) STL', 'green');
    });
    getData('data/Stockholm_ABB.json').then((res) => {
        const data = processData(res.data);
        const chart = renderChart('ABB', data.slice(PERIOD - 1));
        // Calculate plot lines for Bollinger bands
        const bollinger = getBollingerData(data, PERIOD);
        // Render bollinger bands and update chart
        updateChart(chart, bollinger.sma, `${PERIOD}-period SMA`);
        updateChart(chart, bollinger.lowerBand, 'SMA - STDEV * 2', 'lime');
        updateChart(chart, bollinger.upperBand, 'SMA + STDEV * 2', 'red');

        // Calculate and render RSI
        const rsi = getRSIData(data);
        renderChart('RSIABB', rsi, 'RSI(14) ABB', 'green');
    });
});
