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
     * @param BPR the tempo beat per measure, eg: 4
     * @param BL the tempo beat length, eg: 4
     */
    //% blockId=set_tunemeter block="set M(meter) to %meter"
    export function setMeter(BPR: number, BL: number): void {
        tuneBPR = BPR;
        tuneBL = 1/BL;
    }

    /**
     * set tempo
     * @param tempoValue the tempo, eg: 120
     */
    //% blockId=set_tunetempo block="Q(tempo) to ♩= %tempoValue"
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
        makeStop = false;
        if (tune.charAt(0) == "Z") {
            pins.analogPitch(0, (60000 / tuneTempo) * tuneBPR * parseInt(tune.slice(1)));
            return;
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
    }

    /**
     * play melody
     * @param tune melody notes, eg:"C D E F G A B c"
     */
    //% blockId=play_melody block="play %Melody"
    //% parts="headphone"
    export function playMelody(tune: string) {
        let measure=tune.split("|");
        measure.map(function (note: string, index: number) {
            playMeasure(note);
        });
    }
    /**
     * Stop music
     */
    //% blockId=stop_music block="Stop music"
    export function stop(): void {
        makeStop = true;
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
/* test */
input.onButtonPressed(Button.A, function () {
    ABCNotation.setMeter(12, 8);
    ABCNotation.setTempo(3/8, 62);
    ABCNotation.setUNL(1/8);
    ABCNotation.setKey(ABCNotation.Key.Aflat,"");
    ABCNotation.playMelody("z3 z3 z3 E F A/ A/ | A6 A2 z c3/2 c/ B/ A/ | c6 c2 z B c c | c B/ A/ A A3 A2 z A B c | B6 z3 c B A | c3/2 B/ A A3 z3 e2 c | B B/ A/ A A3 A z A A B c | d2 d c2 B B A z A B c | B2 A c B3/2 E/ e e e f c B | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c2 B A3 E3 | c3 c d c B2 z c B A | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c B A A3 E2 B/ A/ | B3 B2 z c e2 c3/5 B3/5 c3/5 B3/5 A3/5 | A3 z3 a2 g f2 g | c3 z z3/2 E/ e2 d c/ B/ A A | A3 z3 a2 g f2 A | c3/2 B/ A A2 z c e e e2 f | c B A A c e a2 g f2 g | c3 A B c e2 d c2 d | c2 c/ B/ B3 d3 c z A/ B/ | c3 B2 z B3 A2 A/ A/ | c'3 b3 a3 g3 | f6 g z3/2 A/ c e A | c2 c c3 z3 A B c | c3/2 B/ A A3/2 A/ A A2 z A B c | d2 d c2 B B A2 A B c | B3 c3 e3 f e c | e3/2 c/ B/ A/ A3 A2 z z z/ c/ c/ e/ | e2 c c2 B B A2 A z/ B/ B/ c/ | d3 d d/ c/ e/ c/ c B/ A/ A z A B | B2 A c2 B e e e f c B | c3 c2 B c3 c B A | c3 c2 B c3 c B A | d3 c2 B A3 E3 | c3 c d c B2 E c B A | c3 c2 B c3 c B A/ A/ | c3 c2 B c3 c B A | d3 c B A A3 z E B | B3 z3 c e2 c3/5 B3/5 c3/5 B3/5 A3/5 | A3 A z2 a2 g f2 g | c3 c z3/2 E/ e2 d c2 B | A3 A z2 a2 g f2 A | c3/2 B A A2 z c e e e2 f | c B A A c e a2 g f2 g | c3 A B c e2 d c2 d | c3 B3 d3 c z A/ B/ | c3 B2 z B3 A z A/ A/ | A6 c3 c B A | B2 c/ B/ A6 E/ F/ A B | c3 B A B d3 c B A | B3 A3 e3 f3/2 e/ c | c3/2 B/ A/ B/ A3 a2 g f2 g | c3 z2 E e2 d c/ B/ A A | A3 z3 a2 g f2 A | c3/2 B/ A A3 c e e e2 f | c B A A c e f2 g/ f/ f2 e | c3 A B c e2 d c2 d | c3 B2 B d3 c3 | c3 B2 z B3 A z A | c3 B3 d3 c3 | c3 B2 z B3 A z G/ A/ | c'3 b3 a3 g3 | f6 g6 | a12 |");
})
input.onButtonPressed(Button.B, function () {
    ABCNotation.stop();
})