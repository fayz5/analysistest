export default (data) =>
    data.map((item) => ({
        x: new Date(item.date).toISOString(),
        y: item.last
    }));
