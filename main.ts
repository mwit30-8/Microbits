input.onButtonPressed(Button.A, function() {
    re_chord();
    print();
})
input.onButtonPressed(Button.B, function() {
    re_arpeggio();
    print();
})
input.onGesture(Gesture.Shake, function() {
    re_rhythm();
    print();
})
input.onButtonPressed(Button.AB, function() {
    re_rhythm();
    if (!re_chord()) {
        re_arpeggio();
    }
    print();
})
let interval = [1 / 1, 16 / 15, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 16 / 9, 15 / 8, 2 / 1];
//let resolve = [[0], [-1], [-2, 1, 2], [0], [0], [-1], [-2,3], [0], [-1], [-2], [2], [1], [0]]
let scale = [0, 2, 4, 5, 7, 9, 11];
let notes = ["=C,","_D,","=D,","_E,","=E,","=F,","^F,","=G,","^G,","=A,","^A,","=B,","=C","_D","=D","_E","=E","=F","^F","=G","^G","=A","^A","=B","=c","_d","=d","_e","=e","=f","^f","=g","^g","=a","^a","=b"];
let movement = [
    [1],
    [3, 5],
    [4, 6],
    [1, 2, 5],
    [1],
    [2, 4],
    [5]
];
//let satisfy_interval = [0,7,5,4,9,10,3,14,11,18,8,13,2,1]
let pitch = [
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [7, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10]
];
let pitch_ = pitch;
let rhythm = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2]
];
let rhythm_ = rhythm;
let x:number=1;
let beat:number=rhythm.length;
basic.forever(function() {
    ABCNotation.playMelody(["X:"+x,
    "T:AutoCreated#"+x,
    "C:Me",
    "L:1/"+beat,
    "Q:1/"+beat+"=240",
    "M:"+beat+"/"+beat,
    "K:"],x);
    for (let r = 0; r < pitch_.length; r++) {
        let room:string="";
        let steak:number=0;
        for (let b = 0; b < 8; b++) {
            if (rhythm_[b][0] == 0) {
                if (rhythm_[(b + 1) % rhythm.length][0] == 0) {
                    steak+=1;
                } else {
                    room=room+steak+" ";
                    room=room+"z";
                    steak=1;
                }
            } else {
                if (rhythm_[b][1] == 0) {
                    room=room+steak+" ";
                    room=room+"z";
                    steak=1;
                } else {
                    room=room+steak+" ";
                    room=room+" "+notes[pitch_[r][0]+pitch_[r][rhythm_[b][1]]];
                    steak=1;
                }
            }
        }
        room=room+steak+" ";
        room=room.replaceAll("0", "");
        room=room.replaceAll("1", "");
        ABCNotation.playMeasure(room);
        rhythm_ = rhythm;
        pitch_ = pitch;
    }
})

function print(){
    let rhythm_=rhythm;
    let pitch_=pitch;
    serial.writeLine("X:"+x);
    serial.writeLine("T:AutoCreated#"+x);
    serial.writeLine("C:Me");
    serial.writeLine("L:1/"+beat);
    serial.writeLine("Q:1/"+beat+"=120");
    serial.writeLine("M:"+beat+"/"+beat);
    serial.writeLine("K:");
    for (let r = 0; r < pitch_.length; r++) {
        let room="";
        let steak=0;
        for (let b = 0; b < 8; b++) {
            if (rhythm_[b][0] == 0) {
                if (rhythm_[(b + 1) % rhythm.length][0] == 0) {
                    steak+=1;
                } else {
                    room=room+steak+" ";
                    room=room+"z";
                    steak=1;
                }
            } else {
                room=room+steak+" ";
                room=room+" "+notes[pitch_[r][0]+pitch_[r][rhythm_[b][1]]];
                steak=1;
            }
        }
        room=room+steak+" ";
        room=room.replaceAll("0", "");
        room=room.replaceAll("1", "");
        serial.writeString(room+"|");
    }
    serial.writeLine("");
    x+=1;
}

function rand(ratio: number[]): number {
    let num = Math.random()
    let random = 0
    let sum = ratio.reduce(function(a, b) {
        return a + b
    }, 0)
    if (sum == 0) {
        random = randint(0, ratio.length)
    } else {
        let prop = [ratio[0] / sum]
        for (let i = 1; i < ratio.length; i++) {
            prop[i] = prop[i - 1] + (ratio[i] / sum)
        }
        for (let i = 0; i < prop.length; i++) {
            if (prop[i] == prop[i - 1]) {
                i++
            }
            if (num > prop[i]) {
                random += 1
            }
            if (num < ratio.length) {
                break
            }
        }
    }
    return random
}

function includes(arr: number[], value: number): boolean {
    let find = false
    for (let i = 0; i < arr.length; i++) {
        if (value == arr[i]) {
            find = true
            break
        }
    }
    return find
}

function re_chord(): boolean {
    let numb = 0
    let range = randint(0, 3)
    let sus_prop = [0, 10, 10, 0]
    let fifth_prop = [0, 10, 0]
    let major7_prop = [1, 1]
    let fixscale = 5
    let _pitch = []
    let base = 0
    let base_ = base
    base = randint(0, scale.length - 1)
    let chord = [scale[base], 0]
    let op = "" + (base + 1)
    if (range > 0) {
        if (includes(scale, (base + 2))) {
            sus_prop[0] *= fixscale
        }
        if (includes(scale, (base + 3))) {
            sus_prop[1] *= fixscale
        }
        if (includes(scale, (base + 4))) {
            sus_prop[2] *= fixscale
        }
        if (includes(scale, (base + 5))) {
            sus_prop[3] *= fixscale
        }
        let major3 = (rand([sus_prop[1], sus_prop[2]]) == 1)
        let sus = rand(sus_prop)
        switch (sus) {
            case 0:
                chord.push(2)
                break
            case 1:
                chord.push(3)
                major3 = false
                break
            case 2:
                chord.push(4)
                major3 = true
                break
            case 3:
                chord.push(5)
                break
        }
        if (range > 1) {
            if (includes(scale, (base + 6))) {
                fifth_prop[0] *= fixscale
            }
            if (includes(scale, (base + 7))) {
                fifth_prop[1] *= fixscale
            }
            if (includes(scale, (base + 8))) {
                fifth_prop[2] *= fixscale
            }
            if (major3) {
                fifth_prop[0] = 0
            } else {
                fifth_prop[2] = 0
            }
            let fifth = rand(fifth_prop)
            switch (fifth) {
                case 0:
                    chord.push(6)
                    break
                case 1:
                    chord.push(7)
                    break
                case 2:
                    chord.push(8)
                    break
            }
            if (range > 2) {
                if (chord[2] == 6) {
                    if (includes(scale, (base + 9))) {
                        major7_prop[0] *= fixscale
                    }
                    if (includes(scale, (base + 10))) {
                        major7_prop[1] *= fixscale
                    }
                } else {
                    if (includes(scale, (base + 10))) {
                        major7_prop[0] *= fixscale
                    }
                    if (includes(scale, (base + 11))) {
                        major7_prop[1] *= fixscale
                    }
                }
                let major7 = rand(major7_prop)
                if (major7 == 0) {
                    chord.push(10)
                } else {
                    chord.push(11)
                }
                if (chord[2] == 6) {
                    chord[3] -= 1
                }
            }
        }
    }
    chord.push(12)
    base_ = base
    _pitch.push(chord)
    while ((base != 0 || rand([5, 1]) == 0) || ((_pitch.length < numb && rand([1, 0]) == 0) && numb != 0) || rand([1, 5]) == 0) {
        if (rand([15, 2]) == 0) {
            base = movement[base_][randint(0, movement[base_].length - 1)] - 1
        } else {
            base = randint(0, scale.length - 1)
        }
        let chord = [scale[base], 0]
        if (range > 0) {
            if (includes(scale, (base + 2))) {
                sus_prop[0] *= fixscale
            }
            if (includes(scale, (base + 3))) {
                sus_prop[1] *= fixscale
            }
            if (includes(scale, (base + 4))) {
                sus_prop[2] *= fixscale
            }
            if (includes(scale, (base + 5))) {
                sus_prop[3] *= fixscale
            }
            let major3 = (rand([sus_prop[1], sus_prop[2]]) == 1)
            let sus = rand(sus_prop)
            switch (sus) {
                case 0:
                    chord.push(2)
                    break
                case 1:
                    chord.push(3)
                    major3 = false
                    break
                case 2:
                    chord.push(4)
                    major3 = true
                    break
                case 3:
                    chord.push(5)
                    break
            }
            if (range > 1) {
                if (includes(scale, (base + 6))) {
                    fifth_prop[0] *= fixscale
                }
                if (includes(scale, (base + 7))) {
                    fifth_prop[1] *= fixscale
                }
                if (includes(scale, (base + 8))) {
                    fifth_prop[2] *= fixscale
                }
                if (major3) {
                    fifth_prop[0] = 0
                } else {
                    fifth_prop[2] = 0
                }
                let fifth = rand(fifth_prop)
                switch (fifth) {
                    case 0:
                        chord.push(6)
                        break
                    case 1:
                        chord.push(7)
                        break
                    case 2:
                        chord.push(8)
                        break
                }
                if (range > 2) {
                    if (chord[2] == 6) {
                        if (includes(scale, (base + 9))) {
                            major7_prop[0] *= fixscale
                        }
                        if (includes(scale, (base + 10))) {
                            major7_prop[1] *= fixscale
                        }
                    } else {
                        if (includes(scale, (base + 10))) {
                            major7_prop[0] *= fixscale
                        }
                        if (includes(scale, (base + 11))) {
                            major7_prop[1] *= fixscale
                        }
                    }
                    let major7 = rand(major7_prop)
                    if (major7 == 0) {
                        chord.push(10)
                    } else {
                        chord.push(11)
                    }
                    if (chord[2] == 6) {
                        chord[3] -= 1
                    }
                }
            }
        } else {
            op = op + "single"
        }
        chord.push(12)
        base_ = base
        _pitch.push(chord)
    }
    if (pitch[0].length == _pitch[0].length) {
        pitch = _pitch
        return false
    } else {
        pitch = _pitch
        re_arpeggio()
        return true
    }
}

function re_rhythm(): void {
    let _rhythm = rhythm
    for (let b = 1; b < rhythm.length; b++) {
        if (Math.randomBoolean()) {
            _rhythm[b][0] = 0
        } else {
            _rhythm[b][0] = 1
        }
    }
    rhythm = _rhythm
}

function re_arpeggio(): void {
    let _rhythm = rhythm
    let key = 0
    for (let b = 1; b < rhythm.length; b++) {
        key = randint(1, pitch[0].length - 1)
        rhythm[b][1] = key
    }
    rhythm = _rhythm
}