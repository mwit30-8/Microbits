/**
 * play notes with ABC notation
 */
//% weight=70 icon="\uf001" color=#D83B01 block="ABC notation"
namespace ABCNotation {
    let emptyKey: number[] = [40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63];
    let tuneKey: number[] = [40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63];
    let tuneBPR: number = 4;
    let tuneBL: number = 1/4;
    let tuneUNL: number = tuneBL;
    let tuneTempo: number = 120;
    let noteKey: number[] = [40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63];
    let noteNo: number = 40;
    let noteLength: number = 500;
    let duration: number = 500;
    let makeStop: boolean = false;

    /**
     * table of note2key
     */
    export enum Key {
        //% block="C"
        C = 1,
        //% block="G"
        G = 2,
        //% block="D"
        D = 3,
        //% block="A"
        A = 4,
        //% block="E"
        E = 5,
        //% block="B"
        B = 6,
        //% block="F#"
        Fsharp = 7,
        //% block="C#"
        Csharp = 8,
        //% block="F"
        F = 9,
        //% block="Bb"
        Bflat = 10,
        //% block="Eb"
        Eflat = 11,
        //% block="Ab"
        Aflat = 12,
        //% block="Db"
        Dflat = 13,
        //% block="Gb"
        Gflat = 14,
        //% block="Cb"
        Cflat = 15,
        //% block="Am"
        Am = 1,
        //% block="Em"
        Em = 2,
        //% block="Bm"
        Bm = 3,
        //% block="F#m"
        Fsharpm = 4,
        //% block="C#m"
        Csharpm = 5,
        //% block="G#m"
        Gsharpm = 6,
        //% block="D#m"
        Dsharpm = 7,
        //% block="A#m"
        Asharpm = 8,
        //% block="Dm"
        Dm = 9,
        //% block="Gm"
            Gm = 10,
        //% block="Cm"
        Cm = 11,
        //% block="Fm"
        Fm = 12,
        //% block="Bbm"
            Bflatm = 13,
        //% block="Ebm"
        Eflatm = 14,
        //% block="Abm"
        Aflatm = 15
    }

    /**
     * list of information field
     */
    let field=["A:","B:","C:","D:","F:","G:","H:","I:","K:","L:","M:","m:","N:","O:","P:","Q:","R:","r:","S:","s:","T:","U:","V:","W:","w:","X:","Z:"];

    /**
     * set key
     */
    //% blockId=set_tunekey block="set K(key) to %Key"
    export function setKey(value: Key,accidental: string): void {
        if (value == null) value = Key.C;
        switch (value) {
            case Key.C: tuneKey = [40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59, 61, 63]; break;
            case Key.G: tuneKey = [40, 42, 44, 46, 47, 49, 51, 52, 54, 56, 58, 59, 61, 63]; break;
            case Key.D: tuneKey = [41, 42, 44, 46, 47, 49, 51, 53, 54, 56, 58, 59, 61, 63]; break;
            case Key.A: tuneKey = [41, 42, 44, 46, 48, 49, 51, 53, 54, 56, 58, 60, 61, 63]; break;
            case Key.E: tuneKey = [41, 43, 44, 46, 48, 49, 51, 53, 55, 56, 58, 60, 61, 63]; break;
            case Key.B: tuneKey = [41, 43, 44, 46, 48, 50, 51, 53, 55, 56, 58, 60, 62, 63]; break;
            case Key.Fsharp: tuneKey = [41, 43, 45, 46, 48, 50, 51, 53, 55, 57, 58, 60, 62, 63]; break;
            case Key.Csharp: tuneKey = [41, 43, 45, 46, 48, 50, 52, 53, 55, 57, 58, 60, 62, 64]; break;
            case Key.F: tuneKey = [40, 42, 44, 45, 47, 49, 50, 52, 54, 56, 57, 59, 61, 62]; break;
            case Key.Bflat: tuneKey = [40, 42, 43, 45, 47, 49, 50, 52, 54, 55, 57, 59, 61, 62]; break;
            case Key.Eflat: tuneKey = [40, 42, 43, 45, 47, 48, 50, 52, 54, 55, 57, 59, 60, 62]; break;
            case Key.Aflat: tuneKey = [40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62]; break;
            case Key.Dflat: tuneKey = [40, 41, 43, 45, 46, 48, 50, 52, 53, 55, 57, 58, 60, 62]; break;
            case Key.Gflat: tuneKey = [39, 41, 43, 45, 46, 48, 50, 51, 53, 55, 57, 58, 60, 62]; break;
            case Key.Cflat: tuneKey = [39, 41, 43, 44, 46, 48, 50, 51, 53, 55, 56, 58, 60, 62]; break;
        }
        if (accidental!=""){
            let note: string[] = accidental.split(' ');
            note.map(function (note: string, index: number) {
                if(note==""){
                    return;
                }
                let accidental=0;
                let accident=false;
                let noteClass=null;
                let isEnd = false;
                for (let pos = 0; pos < note.length; pos++) {
                    let noteElement = note.charAt(pos);
                    if (!isEnd) {
                        switch (noteElement) {
                            case "^": accident=true; accidental+=1; break;
                            case "_": accident=true; accidental-=1; break;
                            case "=": accident=true; accidental=0; break;
                            case "C": noteClass = 0; break;
                            case "D": noteClass = 1; break;
                            case "E": noteClass = 2; break;
                            case "F": noteClass = 3; break;
                            case "G": noteClass = 4; break;
                            case "A": noteClass = 5; break;
                            case "B": noteClass = 6; break;
                            case "c": noteClass = 7; break;
                            case "d": noteClass = 8; break;
                            case "e": noteClass = 9; break;
                            case "f": noteClass = 10; break;
                            case "g": noteClass = 11; break;
                            case "a": noteClass = 12; break;
                            case "b": noteClass = 13; break;
                        }
                    }
                }
                if(accident){
                    tuneKey[noteClass]=emptyKey[noteClass]+accidental;
                    tuneKey[(noteClass+7)%14]=emptyKey[(noteClass+7)%14]+accidental;
                }
            })
        }
    }

    /**
     * set meter
     * @param BPR the beat per measure, eg: 4
     * @param BL the beat length, eg: 4
     */
    //% blockId=set_tunemeter block="set M(meter) to %BPR / %BL"
    export function setMeter(BPR: number, BL: number): void {
        tuneBPR = BPR;
        tuneBL = 1/BL;
    }

    /**
     * set tempo
     * @param BL the beat length, eg: 1/4
     * @param tempoValue the tempo, eg: 120
     */
    //% blockId=set_tunetempo block="Q(tempo) to %BL = %tempoValue"
    export function setTempo(BL: number,tempoValue: number): void {
        tuneTempo = tempoValue*BL/tuneBL;
    }

    /**
     * set unit length
     * @param UNL unit note length, eg: 1/4
     */
    //% blockId=set_tuneUNL block="set L(unit note length) to %unitNoteLength"
    export function setUNL(UNL: number): void {
        tuneUNL = UNL;
    }

    /**
     * play measure
     * @param tune measure notes, eg:"C D E F G A B c"
     */
    //% blockId=play_measure block="play %Measure"
    //% parts="headphone"
    export function playMeasure(tune: string) {
        let beat=0;
        if (tune.charAt(0) == "Z") {
            pins.analogPitch(0, (60000 / tuneTempo) * tuneBPR * parseInt(tune.slice(1)));
            return true;
        }
        let noteKey = tuneKey;
        let note: string[] = tune.split(' ');
        note.map(function (note: string, index: number) {
            if(note==""){
                return;
            }
            let accidental=0;
            let accident=false;
            let noteClass=null;
            noteNo=0;
            note = note + " "
            let isEnd = false;
            for (let pos = 0; pos < note.length; pos++) {
                let noteElement = note.charAt(pos);
                if (!isEnd) {
                    switch (noteElement) {
                        case "^": accident=true; accidental+=1; break;
                        case "_": accident=true; accidental-=1; break;
                        case "=": accident=true; accidental=0; break;
                        case "C": noteClass = 0; break;
                        case "D": noteClass = 1; break;
                        case "E": noteClass = 2; break;
                        case "F": noteClass = 3; break;
                        case "G": noteClass = 4; break;
                        case "A": noteClass = 5; break;
                        case "B": noteClass = 6; break;
                        case "c": noteClass = 7; break;
                        case "d": noteClass = 8; break;
                        case "e": noteClass = 9; break;
                        case "f": noteClass = 10; break;
                        case "g": noteClass = 11; break;
                        case "a": noteClass = 12; break;
                        case "b": noteClass = 13; break;
                        case "z": case "x": noteClass = null; break;
                        case "'": noteNo += 12; break;
                        case ",": noteNo -= 12; break;
                        default:
                            getLength(note, pos);
                            isEnd = true;
                            break;
                    }
                }
            }
            if(accident){
                noteKey[noteClass]=emptyKey[noteClass]+accidental;
                noteKey[(noteClass+7)%14]=emptyKey[(noteClass+7)%14]+accidental;
            }
            if(noteClass!=null){
                noteNo+=noteKey[noteClass];
            }
            beat+=noteLength;
            if (makeStop == false) {
                duration = (60000 / tuneTempo) * noteLength;
                if (noteClass == null) {
                    pins.analogPitch(0, duration);
                } else {
                    pins.analogPitch(noteNo2freq(noteNo), duration);
                }
            }
        });
        return !makeStop;
    }

    /**
     * play melody
     * @param tune melody notes, eg:["X:1","T:title","K:C","C D E F G A B c"]
     */
    //% blockId=play_melody block="play %Melody"
    //% parts="headphone"
    export function playMelody(tune: string[],refno:number=1){
        for(let line of tune){
            line=line.split("%")[0];
            if (line=="X:"+refno){
                makeStop = false;
            }
            if (line=="X:"+(refno+1)){
                makeStop = true;
            }
            if(field.indexOf(line.slice(0,2))!=-1){
                switch(line.charAt(0)){
                    case "I":break;
                    case "K":setKey(ABCNotation.Key.C, line.slice(2));break;
                    case "L":setUNL(parseInt(line.slice(2).split("/",2)[0])/parseInt(line.slice(2).split("/",2)[1]));break;
                    case "M":setMeter(parseInt(line.slice(2).split("/",2)[0]),parseInt(line.slice(2).split("/",2)[1]));break;
                    case "m":break;
                    case "P":break;
                    case "Q":setTempo(parseInt(line.slice(2).split("=",2)[0].split("/",2)[0])/parseInt(line.slice(2).split("=",2)[0].split("/",2)[1]),parseInt(line.slice(2).split("=",2)[1]));break;
                    case "s":break;
                    case "U":break;
                    case "V":break;
                }
            } else {
                line=line.replaceAll("a", " a");
                line=line.replaceAll("b", " b");
                line=line.replaceAll("c", " c");
                line=line.replaceAll("d", " d");
                line=line.replaceAll("e", " e");
                line=line.replaceAll("f", " f");
                line=line.replaceAll("g", " g");
                line=line.replaceAll("A", " A");
                line=line.replaceAll("B", " B");
                line=line.replaceAll("C", " C");
                line=line.replaceAll("D", " D");
                line=line.replaceAll("E", " E");
                line=line.replaceAll("F", " F");
                line=line.replaceAll("G", " G");
                while(line.indexOf("= ")!=-1||line.indexOf("^ ")!=-1||line.indexOf("_ ")!=-1){
                    line=line.replaceAll("= ", " =");
                    line=line.replaceAll("^ ", " ^");
                    line=line.replaceAll("_ ", " _");
                }
                serial.writeLine(line)
                for(let measure of line.split("|")){
                    playMeasure(measure);
                }
            }
        }
    }
    /**
     * Stop music
     */
    //% blockId=stop_music block="Stop music"
    export function stop(): void {
        makeStop = true;
    }
    /**
     * Play music
     */
    //% blockId=play_music block="Play music"
    export function play(): void {
        makeStop = false;
    }
    /**
     * Toggle music
     */
    //% blockId=toggle_music block="Toggle music"
    export function toggle(): void {
        makeStop = !makeStop;
    }

    function getLength(note: string, noteIndex: number) {
        let nLength: number;
        switch (note.substr(noteIndex)) {
            case " ": nLength = 1; break;
            case "/2 ": nLength = 0.5; break;
            case "/ ": nLength = 0.5; break;
            case "/4 ": nLength = 0.25; break;
            case "// ": nLength = 0.25; break;
            case "/8 ": nLength = 0.125; break;
            case "/16 ": nLength = 0.0625; break;
            case "/32 ": nLength = 0.03125; break;
            default: if(note.substr(noteIndex).indexOf("/")==-1){
                nLength=parseInt(note.substr(noteIndex));
            }else{
                nLength = parseInt(note.substr(noteIndex).split("/",2)[0])/parseInt(note.substr(noteIndex).split("/",2)[1]);
            }
        }
        noteLength = (nLength * tuneUNL) / tuneBL;
    }

    /**
     * noteNo2freq
     */
    function noteNo2freq(noteNo:number){
        return 440*Math.pow(2, (noteNo-49)/12);
    }
}