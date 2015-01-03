//Write a program that will display a "spiral" of NxN numbers, using constant space (no arrays allowed). For example, here's what the spiral looks like for N=10:
//
//	99    98    97    96    95    94    93    92    91    90
//	64    63    62    61    60    59    58    57    56    89
//	65    36    35    34    33    32    31    30    55    88
//	66    37    16    15    14    13    12    29    54    87
//	67    38    17     4     3     2    11    28    53    86
//	68    39    18     5     0     1    10    27    52    85
//	69    40    19     6     7     8     9    26    51    84
//	70    41    20    21    22    23    24    25    50    83
//	71    42    43    44    45    46    47    48    49    82
//	72    73    74    75    76    77    78    79    80    81

//array solution
/*
function spiral(n) {
    var singlton = [
        [0]
    ];

    if (1 === n) {
        return singlton;
    }

    if (0 === n % 2) {
        return evenTransform(n, spiral(n - 1));
    }

    if (0 !== n % 2) {
        return oddTransform(n, spiral(n - 1));
    }
}

function evenTransform(n, matrix) {
    console.log(n);
    console.log(JSON.stringify(matrix));
    var upperLeft = n * n - 1, //upper left corner
        newLine = [];
    //new line on top
    for (var i = 0; i < n; i++) {
        newLine.push(upperLeft - i);
    }
    //append on last matrix
    for (var j = 0; j < n - 1; j++) {
        matrix[j].push(upperLeft - i);
        i++;
    }
    //concat two matrix
    matrix.unshift(newLine);
    return matrix;
}


function oddTransform(n, matrix) {
    console.log(n);
    console.log(JSON.stringify(matrix));
    var upperLeft = n * n - 2 * n + 1, //upper left corner
        newLine = [];

    //append on last matrix
    for (var i = 0; i < n - 1; i++) {
        matrix[i].unshift(upperLeft + i);
    }

    //new line on bottom
    for (var j = 0; j < n; j++) {
        newLine.push(upperLeft + i);
        i++;
    }
    //concat two matrix
    matrix.push(newLine);
    return matrix;
}

function print(matrix) {
    var length = matrix.length;
    for (var i = 0; i < length; i++) {
        console.log(matrix[i]);
    }
}
*/

//non-array solution
//get the element at the rth row cth colume in matrix M of size n
function M(n, r, c) {
    var s = n * n - 1;
    //top row has new elemnets in desending order
    if (0 === r) {
        return s - c;
    }

    //last colume has new elemnets in desending order
    if (c === n - 1) {
        return s - c - r;
    }

    //other elements from an inner matrix W of size (n-1)
    r--; //in W the required element is in the (r-1)th row
    return W(n - 1, r, c);
}

//W is a 180 degree rotation of matrix M of the same size
//get the element at the rth row cth colume in matrix W of size n
function W(n, r, c) {
    return M(n, n - 1 - r, n - 1 - c); //180 degree rotation
}

function equalWidth(width, char) {
    var spacenum = width - char.length;
    if (spacenum < 0) {
        console.log('oversized character');
        return char;
    }
    var eqWth = Array(spacenum);
    eqWth.push(char);
    return eqWth.join('&nbsp;&nbsp;');
}

function prtSpiral(n) {
    var maxwidth = (n * n - 1).toString().length;
    for (var i = 0; i < n; i++) {
        var liner = '';
        for (var j = 0; j < n; j++) {
            var number = M(n, i, j);
            document.write(equalWidth(maxwidth, number.toString()));
            document.write('&nbsp;');
        }
        document.write('<br>');
    }
}
