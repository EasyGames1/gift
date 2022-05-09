export default function getPagesArray (pages, limit, current) {
    let out = [];
    for (let i = current - 1; i > 0; i--) {
        if (current - 1 > limit) {
            for (let x = 1; x < Math.floor(limit / 2); x++) {
                out.push(x);
            };
            out.push(`${Math.floor(limit / 2)}...`);
            break;
        } else {
            out.push(current - i);
        };
    };
    out.push(current);
    for (let i = current; i <= current + limit && i <= pages; i++) {
        console.log(current - (current + limit))
        if ((current - (current + limit)) < limit) {
            out.push(`...${current + limit}`);
            for (let x = current + limit + 1; x > current + Math.floor(limit / 2) + 1; x--) {
                out.push(x);
            };
            break;
        };
    };
    console.log(out)
    return out;
};