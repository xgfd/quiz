function diff(A, B) {
    var N = A.length;
    var M = B.length;

    var Vs = [];

    return findPath();

    function findPath() {

        var V = {};
        V[1] = 0;

        for (var d = 0; d <= N + M; d++) {
            for (var k = -d; k <= d; k += 2) {
                // down or right?
                var down = (k == -d || (k != d && V[k - 1] < V[k + 1]));

                var kPrev = down ? k + 1 : k - 1;

                // start povar
                var xStart = V[kPrev];
                var yStart = xStart - kPrev;

                // mid povar
                var xMid = down ? xStart : xStart + 1;
                var yMid = xMid - k;

                // end povar
                var xEnd = xMid;
                var yEnd = yMid;

                // follow diagonal
                //var snake = 0;
                while (xEnd < N && yEnd < M && A[xEnd] == B[yEnd]) {
                    xEnd++;
                    yEnd++;
                    //snake++;
                }

                // save end povar
                V[k] = xEnd;

                // check for solution
                if (xEnd >= N && yEnd >= M) {
                    Vs[d] = V;
                    var snakes = buildSnakes(Vs);
                    return buildEdits(snakes);
                }
            }

            Vs[d] = JSON.parse(JSON.stringify(V));// take snapshots of d contours
        }
    }

    function buildSnakes(Vs) {
        var snakes = []; // list to hold solution

        var p = {
            X: N,
            Y: M
        }; // start at the end

        for (var d = Vs.length - 1; p.X > 0 || p.Y > 0; d--) {
            var V = Vs[d];

            var k = p.X - p.Y;

            // end povar is in V
            var xEnd = V[k];
            var yEnd = xEnd - k;

            // down or right?
            var down = (k == -d || (k != d && V[k - 1] < V[k + 1]));

            var kPrev = down ? k + 1 : k - 1;

            // start povar
            var xStart = p.X = V[kPrev];
            var yStart = p.Y = xStart - kPrev;

            if (yStart < 0) { // started outside the edit graph
                yStart = 0;
            }

            // mid povar
            var xMid = down ? xStart : xStart + 1;
            var yMid = xMid - k;

            snakes.unshift({
                down: (yEnd - yStart) - (xEnd - xStart), //move down? move right? move danial?
                l: xEnd - xMid
            });
        }
        return snakes;
    }

    function buildEdits(snakes) {
        console.log(snakes);
        var a = b = 0; //char position of A & B
        var sol = [];
        snakes.forEach(function(snake, index) {
            var l = snake.l;

            switch (snake.down) {
                case 1: //down
                    sol.push('+' + B[b]);
                    b++;
                    break;
                case 0: //
                    break;
                case -1: //right
                    sol.push('-' + A[a]);
                    a++;
                    break;
            }

            if (l > 0) {
                sol.push(A.substring(a, a + l));
                a += l;
                b += l;
            }
        });
        return sol;
    }
}

var edit = diff('ABCABBA', 'CBABAC');
console.log(edit);
