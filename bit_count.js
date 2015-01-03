//Count set bits in an integer
//Write an efficient program to count number of 1s in binary representation of an integer.

//Brian Kernighan’s Algorithm
function Kernighan(n) {
    var count = 0;
    while (n !== 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}

//bits set lookup table
//works for both positive and negative integers
var lookup = (function() {
    var BitsSetTable256 = [];
    BitsSetTable256[0] = 0;
    for (var i = 0; i < 256; i++) {
        BitsSetTable256[i] = (i & 1) + BitsSetTable256[Math.floor(i / 2)];
    }

    return function(n) {
        var c = 0;
        if (n < 0) {
            c = n & 1;
            n = n >>> 1;
        }
        return c + BitsSetTable256[n & 0xff] +
            BitsSetTable256[(n >> 8) & 0xff] +
            BitsSetTable256[(n >> 16) & 0xff] +
            BitsSetTable256[n >> 24];
    };
})();
