namespace games{
    namespace utility{
    export function todecimal(a:boolean[]):number{
        let n:number=0;
        for(let i=0;i<a.length;i++){
            n*=2;
            if(a[i]){
                n+=1;
            }
        }
        return n;
    }
    export function tobinary(n:number,length:number):boolean[]{
        let m:number=n;
        let a:boolean[]=[];
        for(let i=0;i<length;i++){
            a.unshift(m%2==1);
            m=Math.floor(m/2);
        }
        return a;
    }
    }
    
    export namespace educablerobot{
    export class educablerobot{
        private lastmove:number[];
        private threat:boolean[][];
        constructor(move:any[][]){
            this.threat=[];
            for(let i=0;i<move.length;i++){
                this.threat.push([]);
                for(let j=0;j<move[i].length;j++){
                    this.threat[i].push(true);
                }
            }
            this.lastmove=[-1,-1];
        }
        public play(map:number):number[]{
            let pos:number=map;
            let playable:number[]=[];
            for(let i=0;i<this.threat[pos].length;i++){
                if(this.threat[pos][i]){
                    playable.push(i);
                }
            }
            if(playable.length==0){
                return [-1,-1];
            }
            this.lastmove=[pos,randint(0,playable.length-1)];
            return this.lastmove;
        }
        public recieved(end:string){
            switch (end){
                case "whitewin": this.threat[this.lastmove[0]][this.lastmove[1]]=false;
                case "blackwin": 
                case "blacklose": 
                case "whitelose": 
                default:
            }
        }
    }
    }


export namespace towerofhanoi{
    export class tower{
        public height:number;
        constructor(height:number){
            this.height=height;
        }
        public solve():number[][]{
            let solution:number[][]=[];
            if(this.height>0){ // 01, -, -
                let pop:tower=new tower(this.height-1); // 1, -, -
                let prev_1:number[][]=pop.solve(); // 1, -, - => -, -, 1
                let prev_2:number[][]=pop.solve(); // 1, -, - => -, -, 1
                for(let value of prev_1){
                    value[1]=(3-value[1])%3; // 1, -, - => -, 1, -
                    solution.push(value);
                } //  01, -, - => 0, 1, -
                solution.push([this.height,2]); // -, 1, 0
                for(let value of prev_2){
                    value[1]=(4-value[1])%3; // -, 1, - => -, -, 1
                    solution.push(value);
                } // -, 1, 0 => -, -, 01
            }else{
                solution.push([this.height,2]); // 0, -, - => -, -, 0
            }
            return solution;
        }
    }
export function sample(){
let t:towerofhanoi.tower=new towerofhanoi.tower(4);
let soln:number[][]=t.solve();
for(let j=0;j<5;j+=1){
    led.plot(0,j);
}
for(let move of soln){
    basic.pause(100);
    led.unplot(0, move[0]);
    led.unplot(2, move[0]);
    led.unplot(4, move[0]);
    led.plot(move[1]*2, move[0]);
}
}
}


    export namespace parrondoparadox{
        const budget:number=100;
        const goal:number=1000;
        const payload:number=1;
        const reward:number=1;
        const a_delta:number=-1;
        const b_delta:number=-1;
        const b_earn:number=+3;
        const b_games:number=2;
        let money:number=budget;
        function A():void {
            let playing:number=a_delta;
            money-=payload;
            if(Math.abs(playing)>=1){
                money+=payload;
                money+=Math.floor(playing);
            }else if(Math.random()<((payload+playing)/(reward+payload))){
                money+=payload;
                money+=reward;
            }
        }
        function B():void {
            let earning:number=b_earn;
            let losing:number=(b_delta*b_games-b_earn)/(b_games-1);
            money-=payload;
            if(money%(b_games)==0){
                if(Math.abs(earning)>=1){
                    money+=payload;
                    money+=Math.floor(earning);
                }else if(Math.random()<((payload+earning)/(reward+payload))){
                    money+=payload;
                    money+=reward;
                }
            }else{
                if(Math.abs(losing)>=1){
                    money+=payload;
                    money+=Math.floor(losing);
                }else if(Math.random()<((payload+losing)/(reward+payload))){
                    money+=payload;
                    money+=reward;
                }
            }
        }
        export function sample(){
            let play:string="";
            let check:boolean=true;
            let playable:boolean=false;
            basic.forever(function () {
                if(playable){
                    let display:number=money;
                    let l:number=2;
                    for(let x=0;x<5;x++){
                        for(let y=0;y<5;y++){
                    led.plotBrightness(x,y,(display%l)*255/(l-1));
                            display=Math.floor(display/l)
                        }
                    }
                    if(input.buttonIsPressed(Button.A)&&input.buttonIsPressed(Button.B)){
                        play=ifrandomplay();
                        if(false){
                            if(Math.randomBoolean()){
                                A();
                            }else{
                                B();
                            }
                        }else if(play=="A"){
                            A();
                        }else if(play=="B"){
                            B();
                        }else{
                            if(Math.randomBoolean()){
                                A();
                            }else{
                                B();
                            }
                        }
                    }else if(input.buttonIsPressed(Button.A)){
                        A();
                        basic.pause(500);
                    }else if(input.buttonIsPressed(Button.B)){
                        B();
                        basic.pause(500);
                    }else{
                    }
                    if(money<payload){
                        check=false;
                        music.stopMelody(MelodyStopOptions.All);
                        playable=false;
                        basic.pause(500);
                        music.startMelody(music.builtInMelody(Melodies.PowerDown),MelodyOptions.OnceInBackground);
                        money=budget;
                        basic.pause((9/2)*60000/120);
                        check=true;
                    }
                    if(money>goal){
                        check=false;
                        music.stopMelody(MelodyStopOptions.All);
                        playable=false;
                        basic.pause(500);
                        music.startMelody(music.builtInMelody(Melodies.PowerUp),MelodyOptions.OnceInBackground);
                        money=budget;
                        basic.pause((9/2)*60000/120);
                        check=true;
                    }
                }else{
                    basic.pause(500);
                    led.enable(false);
                    check=false;
                    basic.pause(500);
                    led.enable(true);
                    check=true;
                }
            });
            input.onButtonPressed(Button.A, function () {
                if(!playable&&check){
                    playable=true;
                    music.startMelody(music.builtInMelody(Melodies.Chase),MelodyOptions.ForeverInBackground);
                }
            });
            input.onButtonPressed(Button.B, function () {
                if(!playable&&check){
                    playable=true;
                    music.startMelody(music.builtInMelody(Melodies.Chase),MelodyOptions.ForeverInBackground);
                }
            });
            input.onButtonPressed(Button.AB, function () {
                if(!playable&&check){
                    playable=true;
                    music.startMelody(music.builtInMelody(Melodies.Chase),MelodyOptions.ForeverInBackground);
                }
            });
            function ifrandomplay():string{
                let previous:number=money;
                A();
                let ifA:number=money;
                money=previous;
                B();
                let ifB:number=money;
                money=previous;
                if(ifA==ifB){
                    if(Math.randomBoolean()){
                        return "A";
                    }else{
                        return "B";
                    }
                }else if(ifA>=ifB){
                    return "A";
                }else if(ifA<=ifB){
                    return "B";
                }else{
                    if(Math.randomBoolean()){
                        return "A";
                    }else{
                            return "B";
                    }
                }
            }
        }
    }

    export namespace hexapawn{
    export enum state{
        empty=0,
        black=1,
        white=2
    }
    export class game{
        public board:state[][];
        public player:state;
        constructor(){
            let pawns:number=3;
            let length:number=3;
            this.player=state.white;
            this.board=[];
            this.board.push([]);
            for(let j=0;j<pawns;j++){
                this.board[0].push(state.white);
            }
            for(let i=1;i<length-1;i++){
                this.board.push([]);
                for(let j=0;j<pawns;j++){
                    this.board[i].push(state.empty);
                }
            }
            this.board.push([]);
            for(let j=0;j<pawns;j++){
                this.board[length-1].push(state.black);
            }
        }
        public moveavaliable(x1:number,y1:number,x2:number,y2:number):state{
            if(x1<0||x1>=this.board.length||x2<0||x2>=this.board.length){
                return state.empty;
            }
            if(y1<0||y1>=this.board[x1].length||y2<0||y2>=this.board[x2].length){
                return state.empty;
            }
            if(this.board[x1][y1]==state.empty){
                return state.empty;
            }
            if(this.board[x1][y1]==state.white){
                if(x2-x1!=1){
                    return state.empty;
                }else{
                    if(y1==y2&&this.board[x2][y2]==state.empty){
                        return state.white;
                    }else if(Math.abs(y2-y1)==1&&this.board[x2][y2]==state.black){
                        return state.white;
                    }else{
                        return state.empty;
                    }
                }
            }else{
                if(x1-x2!=1){
                    return state.empty;
                }else{
                    if(y1==y2&&this.board[x2][y2]==state.empty){
                        return state.black;
                    }else if(Math.abs(y2-y1)==1&&this.board[x2][y2]==state.white){
                        return state.black;
                    }else{
                        return state.empty;
                    }
                }
            }
        }
        public avaliablemove(x:number,y:number):number[][]{
            let op:number[][]=[];
            for(let i=-1;Math.abs(i)<=1;i++){
                for(let j=-1;Math.abs(j)<=1;j++){
                    if(this.moveavaliable(x, y,x+i,y+j)!=state.empty){
                        op.push([x+i,y+j]);
                    }
                }
            }
            return op;
        }
        private update(x1:number,y1:number,x2:number,y2:number):state{
            let ret:state=this.moveavaliable(x1,y1,x2,y2);
            if(ret!=state.empty){
                this.board[x2][y2]=this.board[x1][y1];
                this.board[x1][y1]=state.empty;
            }
            return ret;
        }
        private checkwin(lastmove:state):state{
            for(let j=0;j<this.board[0].length;j++){
                if(this.board[0][j]==state.black){
                    return state.black;
                }
            }
            for(let j=0;j<this.board[this.board.length-1].length;j++){
                if(this.board[this.board.length-1][j]==state.white){
                    return state.white;
                }
            }
            let movable:number[]=[state.empty,state.empty];
            for(let i=0;i<this.board.length;i++){
                for(let j=0;j<this.board[i].length;j++){
                    if(this.board[i][j]==state.white){
                        if(j<this.board[i].length-1){
                            movable[0]+=this.moveavaliable(i,j,i+1,j+1);
                        }
                        movable[0]+=this.moveavaliable(i,j,i+1,j);
                        if(j>0+1){
                            movable[0]+=this.moveavaliable(i,j,i+1,j-1);
                        }
                    }
                    if(this.board[i][j]==state.black){
                        if(j<this.board[i].length-1){
                            movable[1]+=this.moveavaliable(i,j,i+1,j+1);
                        }
                        movable[1]+=this.moveavaliable(i,j,i+1,j);
                        if(j>0+1){
                            movable[1]+=this.moveavaliable(i,j,i+1,j-1);
                        }
                    }
                }
            }
            if(movable[0]==0&&movable[1]==0){
                return lastmove;
            }
            if(movable[0]==0&&movable[1]!=0){
                return state.black;
            }
            if(movable[1]==0&&movable[0]!=0){
                return state.white;
            }
            return state.empty;
        }
        public move(x1:number,y1:number,x2:number,y2:number):string{
            if(x1==0&&y1==0&&x2==0&&y2==0){
                switch (this.player){
                    case state.black:return "blacklose";break;
                    case state.white:return "whitelose";break;
                    default: return "";
                }
            }
            let moving:state=this.update(x1,y1,x2,y2);
            if(moving==state.empty){
                return "invalid";
            }
            this.player=(3-this.player)%3;
            let winning:state=this.checkwin(moving);
            switch (winning){
                case state.empty:return "valid";break;
                case state.black:return "blackwin";break;
                case state.white:return "whitewin";break;
                default: return "error";
            }
        }
    }
    export class hexapawnbot extends educablerobot.educablerobot{
        private turn:number;
        private move:number[][][];
        private map:state[][][][];
        private remap:number[][][][];
        constructor(){
            let map:state[][][][]=[[[[0,2,2],[2,0,0],[1,1,1]],[[2,0,2],[0,2,0],[1,1,1]]],
            [[[0,0,2],[1,2,0],[1,0,1]],[[0,0,2],[2,1,0],[0,1,1]],[[0,2,0],[2,2,0],[1,0,1]],[[0,0,2],[2,0,2],[1,1,0]],[[2,0,0],[0,1,2],[0,1,1]],[[2,0,0],[1,2,2],[0,1,1]],[[0,2,0],[1,0,2],[1,0,1]],[[0,0,2],[0,2,0],[0,1,1]],[[2,0,0],[0,2,0],[0,1,1]],[[0,0,2],[2,0,0],[1,0,1]]],
            [[[0,0,0],[1,1,2],[0,0,1]],[[0,0,0],[2,2,2],[1,0,0]],[[0,0,0],[1,0,0],[0,1,0]],[[0,0,0],[1,1,0],[1,0,0]],[[0,0,0],[2,1,1],[0,0,1]],[[0,0,0],[1,2,0],[0,0,1]],[[0,0,0],[2,1,0],[0,1,0]],[[0,0,0],[1,2,0],[1,0,0]]]];
            let move:number[][][]=[];
            for(let a=0;a<map.length;a++){
                move.push([]);
                for(let b=0;b<map[a].length;b++){
                    move[a].push([]);
                    let board:game=new game();
                    board.board=map[a][b];
                    for(let i=0;i<board.board.length;i++){
                        for(let j=0;j<board.board[i].length;j++){
                            if(board.board[i][j]==state.black){
                                move.push(board.avaliablemove(i, j));
                            }
                        }
                    }
                }
            }
            super(move);
            this.move=move;
            this.map=map;
            this.turn=0;
            this.remap=[[[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]]],[[[0,2],[0,1],[0,0]],[[1,2],[1,1],[1,0]],[[2,2],[2,1],[2,0]]]];
        }
        private similar(boardA:state[][],boardB:state[][]):number{
            for(let m=0;m<this.remap.length;m++){
                let unequi:boolean=false;
                for(let i=0;i<boardA.length;i++){
                    for(let j=0;j<boardA[i].length;j++){
                        if(boardA[i][j]!=boardB[this.remap[m][i][j][0]][this.remap[m][i][j][1]]){
                            unequi=true;
                        }
                        if(unequi){
                            break;
                        }
                    }
                    if(unequi){
                        break;
                    }
                }
                if(!unequi){
                    return m;
                    break;
                }
            }
            return -1;
        }
        private findmap(board:state[][]):number[]{
            for(let i=0;i<this.map[this.turn].length;i++){
                let remap:number=this.similar(board,this.map[this.turn][i]);
                if(remap!=-1){
                    if(this.turn==0){
                        i+=0
                    }
                    if(this.turn==1){
                        i+=0+this.map[0].length
                    }
                    if(this.turn==2){
                        i+=0+this.map[0].length+this.map[1].length
                    }
                    return [i,remap];
                }
            }
            return [-1,-1];
        }
        private reversemovemap(move:number[],remap:number):number[]{
            let movemap:number[]=[0,0,0,0];
            movemap[0]=this.remap[remap][move[0]][move[1]][0];
            movemap[1]=this.remap[remap][move[0]][move[1]][1];
            movemap[2]=this.remap[remap][move[2]][move[3]][0];
            movemap[3]=this.remap[remap][move[2]][move[3]][1];
            return movemap;
        }
        public playboard(board:state[][]):number[]{
            let map:number[]=this.findmap(board);
            if(map[0]==-1){
                return [0,0,0,0];
            }
            let role=super.play(map[0]);
            if(role==[-1,-1]){
                return [0,0,0,0];
            }
            role=this.reversemovemap(role,map[1]);
            this.turn+=1;
            return this.move[role[0]][role[1]];
        }
    }
    }


    export namespace pennysgame{
    export function player1_bot(length:number):number{
        winning_prob=table(length);
        let best:number=0;
        let index:number[]=[];
        for(let i=0;i<winning_prob.length;i++){
            let sum:number=0;
            for(let j=0;j<winning_prob[i].length;j++){
                sum+=winning_prob[i][j];
            }
            if(sum==best){
                index.push(i);
            }
            if(sum>best){
                index=[i];
                best=sum;
            }
        }
        return index[randint(1,index.length)-1];
    }
    export function player2_bot(player1:number){
        let best:number=0;
        let index:number[]=[];
        let i:number=player1;
        for(let j=0;j<winning_prob[i].length;j++){
            if(winning_prob[i][j]==best){
                index.push(i);
            }
            if(winning_prob[i][j]>best){
                index=[i];
                best=winning_prob[i][j];
            }
        }
        return index[randint(1,index.length)-1];
    }
    let winning_prob:number[][];
    function table(length:number):number[][]{
        let table:number[][]=[];
        for(let i=0;i<Math.pow(2,length);i++){
            table.push([]);
            for(let j=0;j<Math.pow(2,length);j++){
                table[i].push(0);
            }
        }
        for(let i=0;i<Math.pow(2,length);i++){
            for(let j=0;j<Math.pow(2,length);j++){
                table[i][j]=ratio(i,j,length);
            }
        }
        for(let i=0;i<Math.pow(2,length);i++){
            table[i][i]=1;
        }
        return table;
    }
    function ratio(a:number,b:number,length:number):number{
        let aa:number=compile(a,a,length);
        let ab:number=compile(a,b,length);
        let bb:number=compile(b,b,length);
        let ba:number=compile(b,a,length);
        let tick:number=(bb-ba)/(aa-ab);
        return tick/(1+tick);
    }
    function compile(a:number,b:number,length:number):number{
        let x:boolean[]=utility.tobinary(a,length);
        let y:boolean[]=utility.tobinary(b,length);
        let z:boolean[]=[];
        for(let i=0;i<length;i++){
            z.push(utility.todecimal(x)==utility.todecimal(y));
            x.shift();
            y.pop();
        }
        return utility.todecimal(z);
    }
    }
}