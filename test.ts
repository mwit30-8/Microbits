// tests go here; this will not be compiled when this package is used as an extension.
let board = recieve()
let tmp = new solver.soduku();
let inp = tmp.alignfrom(board);
let solved = solver.solve(inp, tmp);
let opt = tmp.alignto(solved);
send(opt);

function send(bb: number[][]): void {
    for (let i = 0; i < bb.length; i++) {
        serial.writeNumbers(bb[i]);
    };
};

function recieve(): number[][] {
    return [
        [0, 5, 1, 3, 6, 2, 7, 0, 0],
        [0, 4, 0, 0, 5, 8, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 2, 5],
        [0, 8, 0, 0, 0, 0, 9, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 0, 5, 0, 0, 0, 0, 8, 0],
        [1, 2, 0, 0, 0, 9, 0, 0, 0],
        [0, 0, 0, 2, 8, 0, 0, 6, 0],
        [0, 0, 8, 5, 3, 4, 2, 9, 0]
    ];
};