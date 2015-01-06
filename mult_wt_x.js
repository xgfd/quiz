function inc(x) {
    return x & 1 ? inc(x >> 1) << 1 : x | 1;
}

function dec(x) {
    return x & 1 ? x ^ 1 : dec(x >> 1) << 1 | 1;
}

function add(x, y) {
    return x ? add(dec(x), inc(y)) : y;
}

function mul(x, y) {
    return x ? x ^ 1 ? add(y, mul(dec(x), y)) : y : 0;
}
