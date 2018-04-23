export default (data = [], period = 20) => {
    if (data.length < period) return null;

    let periodSum = 0; // sum of {period} samples
    let squaredSum = 0; // squared sum of samples
    const sma = []; // date vs MA array for the given {period}
    const upperBand = [];
    const lowerBand = [];

    for (let i = 0; i < period; i++) {
        periodSum += data[i].y;
        squaredSum += data[i].y * data[i].y;
    }

    // Standard deviation sigma = sqrt(E(X^2)-E(X)^2)
    const sigma = Math.sqrt(
        squaredSum / period - periodSum / period * (periodSum / period)
    );

    /* Simple Moving Average(SMA) and Standard deviation(sigma) is available
    only starting from date where there are enough samples to calculate it
    */

    sma.push({
        x: data[period - 1].x,
        y: periodSum / period // E(X)
    });

    upperBand.push({
        x: data[period - 1].x,
        y: periodSum / period + 2 * sigma
    });

    lowerBand.push({
        x: data[period - 1].x,
        y: periodSum / period - 2 * sigma
    });

    for (let i = period; i < data.length; i++) {
        periodSum = periodSum - data[i - period].y + data[i].y; // Update period sum for current date
        squaredSum =
            squaredSum -
            data[i - period].y * data[i - period].y +
            data[i].y * data[i].y; // Update squared sum for current date

        const mju = periodSum / period; // current SMA
        const stdev = Math.sqrt(squaredSum / period - mju * mju); // current Standard Deviation sigma = sqrt(E(X^2)-E(x)^2)

        // Push current SMA
        sma.push({
            x: data[i].x,
            y: mju
        });
        // Push current value of SMA + STDEV * 2
        upperBand.push({
            x: data[i].x,
            y: mju + 2 * stdev
        });
        // Push current value of SMA - STDEV * 2
        lowerBand.push({
            x: data[i].x,
            y: mju - 2 * stdev
        });
    }

    return {
        sma,
        upperBand,
        lowerBand
    };
};
