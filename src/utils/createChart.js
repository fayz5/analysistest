import Chart from 'chart.js';

export default (context, data = [], label = 'unknown', color = '#1a5ecc') => {
    const config = {
        type: 'line',
        data: {
            datasets: [
                {
                    label,
                    fill: false,
                    data,
                    pointRadius: 0,
                    borderColor: color
                }
            ]
        },
        options: {
            responsive: false,
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        display: true
                    }
                ]
            }
        }
    };

    return new Chart(context, config);
};
