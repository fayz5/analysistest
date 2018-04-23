export default (data = [], period = 14) => {
    let sumGain = 0;
    let sumLoss = 0;
    let averageGain;
    let averageLoss;
    const rsi = [];

    if (data.length < period) return [];
    for (let i = 1; i <= period; i++) {
        const diff = data[i].y - data[i - 1].y;
        const gain = diff >= 0 ? diff : 0;
        const loss = diff < 0 ? 0 - diff : 0;
        sumGain += gain;
        sumLoss += loss;
    }

    averageGain = sumGain / period;
    averageLoss = sumLoss / period;

    rsi.push({
        x: data[period].x,
        y: averageLoss !== 0 ? 100 - 100 / (1 + averageGain / averageLoss) : 100
    });

    for (let i = period + 1; i < data.length; i++) {
        const diff = data[i].y - data[i - 1].y;
        const gain = diff >= 0 ? diff : 0;
        const loss = diff < 0 ? 0 - diff : 0;

        averageGain = (averageGain * (period - 1) + gain) / period;
        averageLoss = (averageLoss * (period - 1) + loss) / period;

        rsi.push({
            x: data[i].x,
            y:
                averageLoss !== 0
                    ? 100 - 100 / (1 + averageGain / averageLoss)
                    : 100
        });
    }

    return rsi;
};
