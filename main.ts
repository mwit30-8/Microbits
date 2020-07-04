namespace solver {
    export class template {
        public zone: number[][];
        public filler: number[];
        constructor(zone: any[][], filler: any[]) {
            this.zone = zone;
            this.filler = filler;
        };
    };
    export class soduku extends template {
        constructor() {
            super([
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                [1, 1, 1, 2, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 4, 4, 4, 5, 5, 5, 6, 6, 6, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 7, 7, 7, 8, 8, 8, 9, 9, 9, 7, 7, 7, 8, 8, 8, 9, 9, 9]
            ], [1, 2, 3, 4, 5, 6, 7, 8, 9])
        };
        public alignfrom(board: number[][]): number[] {
            let align = [];
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    align.push(board[i][j]);
                };
            };
            return align;
        };
        public alignto(board: number[]): number[][] {
            let align2 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            for (let k = 8; k >= 0; k--) {
                for (let l = 8; l >= 0; l--) {
                    align2[k][l] = board.pop();
                };
            };
            return align2;
        };
    };

    function nextEmptySpot(board: any[], filler: any[]): number {
        for (let m = 0; m < board.length; m++) {
            if (filler.indexOf(board[m]) == -1)
                return m;
        };
        return -1;
    };

    function checkZone(board: any[], zone: any[], loc: number, value: any): boolean {
        for (let r = 0; r < zone.length; r++) {
            if (board[r] == value && zone[loc] == zone[r])
                return false;
        };
        return true;
    };

    function checkValue(board: any[], zone: any[][], loc: number, value: any): boolean {
        for (let s = 0; s < zone.length; s++) {
            if (!checkZone(board, zone[s], loc, value))
                return false;
        };
        return true;
    };

    function solving(board: any[], template: template): any[] {
        let emptySpot = nextEmptySpot(board, template.filler);
        // there is no more empty spots
        if (emptySpot == -1) {
            return board;
        };
        for (let n = 0; n < template.filler.length; n++) {
            let num = template.filler[n]
            if (checkValue(board, template.zone, emptySpot, num)) {
                board[emptySpot] = num;
                solving(board, template);
            };
        };
        if (nextEmptySpot(board, template.filler) != -1) {
            board[emptySpot] = 0;
        };
        return board;
    };
    export function solve(board: any[], template: template): any[] {
        let b = board;
        return solving(b, template);
    };
};