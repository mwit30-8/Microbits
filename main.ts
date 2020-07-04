input.onButtonPressed(Button.A, function() {
    re_chord()
})
input.onButtonPressed(Button.B, function() {
    re_arpeggio()
})
input.onGesture(Gesture.Shake, function() {
    re_rhythm()
})
input.onButtonPressed(Button.AB, function() {
    re_rhythm()
    if (!re_chord()) {
        re_arpeggio()
    }
})
let interval = [1 / 1, 16 / 15, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 16 / 9, 15 / 8, 2 / 1]
//let resolve = [[0], [-1], [-2, 1, 2], [0], [0], [-1], [-2,3], [0], [-1], [-2], [2], [1], [0]]
let scale = [0, 2, 4, 5, 7, 9, 11]
let movement = [
    [1],
    [3, 5],
    [4, 6],
    [1, 2, 5],
    [1],
    [2, 4],
    [5]
]
//let satisfy_interval = [0,7,5,4,9,10,3,14,11,18,8,13,2,1]
let tune = 110
let pitch = [
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [6, 0, 4, 7, 9, 10],
    [5, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10],
    [0, 0, 4, 7, 9, 10]
]
let pitch_ = pitch
let rhythm = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2]
]
let rhythm_ = rhythm
let note = tune
music.setTempo(30)
basic.showNumber(1, 0)
music.playTone(tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
basic.showNumber(2, 0)
music.playTone(tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
basic.showNumber(3, 0)
music.playTone(tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
basic.showNumber(4, 0)
music.playTone(tune, music.beat(BeatFraction.Eighth))
music.rest(music.beat(BeatFraction.Eighth))
basic.forever(function() {
    for (let r = 0; r < pitch_.length; r++) {
        for (let b = 0; b < rhythm.length; b++) {
            basic.showNumber(Math.floor(b / 2) + 1, 0)
            if (rhythm_[b][0] == 0) {
                if (rhythm_[(b + 1) % rhythm.length][0] == 0) {
                    basic.pause(music.beat(BeatFraction.Sixteenth))
                } else {
                    music.rest(music.beat(BeatFraction.Sixteenth))
                }
            } else {
                if (rhythm_[b][1] == 0) {
                    music.rest(music.beat(BeatFraction.Sixteenth))
                } else {
                    note = tune * factor(pitch_[r][0]) * factor(pitch_[r][rhythm_[b][1]])
                    music.ringTone(note)
                    basic.pause(music.beat(BeatFraction.Sixteenth))
                }
            }
            if (rhythm_[(b + 1) % rhythm.length][0] == 0) {
                basic.pause(music.beat(BeatFraction.Sixteenth))
            } else {
                music.rest(music.beat(BeatFraction.Sixteenth))
            }
        }
        rhythm_ = rhythm
    }
    pitch_ = pitch
})

function factor(int: number): number {
    let fact = 1
    let i = int
    while (i < 0) {
        fact *= 1 / interval[interval.length - 1]
        i += (interval.length - 1)
    }
    while (i > interval.length) {
        fact *= interval[interval.length - 1]
        i -= (interval.length - 1)
    }
    fact *= interval[i]
    return fact
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
    let numb = 8
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
        if (includes(scale, (base + 4))) {
            sus_prop[3] *= fixscale
        }
        let major3 = (rand([sus_prop[1], sus_prop[2]]) == 1)
        let sus = rand(sus_prop)
        switch (sus) {
            case 0:
                op = op + "sus2"
                chord.push(2)
                break
            case 1:
                op = op + "min"
                chord.push(3)
                major3 = false
                break
            case 2:
                op = op + "maj"
                chord.push(4)
                major3 = true
                break
            case 3:
                op = op + "sus4"
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
                    op = op + "dim"
                    chord.push(6)
                    break
                case 1:
                    op = op + "_"
                    chord.push(7)
                    break
                case 2:
                    op = op + "aug"
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
                    op = op + "7"
                } else {
                    chord.push(11)
                    op = op + "M7"
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
    serial.writeString(op + " ")
    _pitch.push(chord)
    while ((base != 0 && rand([1, 1]) == 0) || (_pitch.length < numb && rand([1, 1]) == 0) || rand([1, 10]) == 0) {
        if (rand([1, 10]) == 0) {
            base = movement[base_][randint(0, movement[base_].length - 1)] - 1
        } else {
            base = randint(0, scale.length - 1)
        }
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
            if (includes(scale, (base + 4))) {
                sus_prop[3] *= fixscale
            }
            let major3 = (rand([sus_prop[1], sus_prop[2]]) == 1)
            let sus = rand(sus_prop)
            switch (sus) {
                case 0:
                    op = op + "sus2"
                    chord.push(2)
                    break
                case 1:
                    op = op + "min"
                    chord.push(3)
                    major3 = false
                    break
                case 2:
                    op = op + "maj"
                    chord.push(4)
                    major3 = true
                    break
                case 3:
                    op = op + "sus4"
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
                        op = op + "dim"
                        chord.push(6)
                        break
                    case 1:
                        op = op + "_"
                        chord.push(7)
                        break
                    case 2:
                        op = op + "aug"
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
                        op = op + "7"
                    } else {
                        chord.push(11)
                        op = op + "M7"
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
        serial.writeString(op + " ")
        _pitch.push(chord)
    }
    serial.writeLine("")
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
    serial.writeString("play" + " ")
    for (let b = 1; b < rhythm.length; b++) {
        if (Math.randomBoolean()) {
            _rhythm[b][0] = 0
            serial.writeString("pause" + " ")
        } else {
            _rhythm[b][0] = 1
            serial.writeString("play" + " ")
        }
    }
    rhythm = _rhythm
    serial.writeLine("")
}

function re_arpeggio(): void {
    let _rhythm = rhythm
    serial.writeString("1" + " ")
    let key = 0
    for (let b = 1; b < rhythm.length; b++) {
        key = randint(1, pitch[0].length - 1)
        rhythm[b][1] = key
        serial.writeString(key + " ")
    }
    rhythm = _rhythm
    serial.writeLine("")
}