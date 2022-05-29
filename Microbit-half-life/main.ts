input.onButtonPressed(Button.A, function () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (Math.randomBoolean() && led.point(x, y)) {
                led.plot(x, y)
            } else if (led.point(x, y)) {
                music.ringTone(262)
                led.unplot(x, y)
            }
            music.rest(music.beat(BeatFraction.Sixteenth))
        }
    }
})
input.onButtonPressed(Button.B, function () {
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            led.plot(x2, y2)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    list = []
    H = 0
    for (let index = 0; index < 100; index++) {
        list.push(1)
        H += 1
    }
    serial.writeNumbers(list)
    basic.showNumber(H)
    _H = H
    _list = list
    while (H > 0) {
        list = []
        H = 0
        for (let index = 0; index <= _H; index++) {
            if (_list[index] == 1) {
                if (Math.randomBoolean()) {
                    list.push(1)
                    H += 1
                } else {
                    list.push(0)
                }
            }
        }
        serial.writeNumbers(list)
        basic.showNumber(H)
        _H = H
        _list = list
    }
    for (let x3 = 0; x3 <= 4; x3++) {
        for (let y3 = 0; y3 <= 4; y3++) {
            led.plot(x3, y3)
        }
    }
})
let _list: number[] = []
let _H = 0
let H = 0
let list: number[] = []
for (let x3 = 0; x3 <= 4; x3++) {
    for (let y3 = 0; y3 <= 4; y3++) {
        led.plot(x3, y3)
    }
}
