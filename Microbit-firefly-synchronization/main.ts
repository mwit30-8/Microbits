let i: number;
let MAX_TIME = 50
let ON_DURATION = 10
let RANGE = 2
let INCREMENT = 1
let timer = [0]
let ticked = [false]
for (i = 0; i < 25; i++) {
    timer[i] = randint(0, MAX_TIME)
    ticked[i] = false
}
radio.setGroup(58)
basic.forever(function on_forever() {
    let i: number;
    let out: boolean;
    let inc = [0]
    for (let px = 0; px < 5; px++) {
        for (let py = 0; py < 5; py++) {
            i = 5 * px + py
            out = false
            inc[i] = 0
            inc[i] += 1
            if (!led.point(px, py) && timer[i] < ON_DURATION) {
                led.plot(px, py)
                radio.sendValue("increment", i)
                for (let dx = -RANGE; dx < RANGE + 1; dx++) {
                    for (let dy = -RANGE; dy < RANGE + 1; dy++) {
                        if (_py.range(5).indexOf(px + dx) >= 0 && _py.range(5).indexOf(py + dy) >= 0) {
                            inc[5 * (px + dx) + (py + dy)] += INCREMENT
                        }
                        
                    }
                }
            }
            
            if (led.point(px, py) && timer[i] > ON_DURATION) {
                led.unplot(px, py)
            }
            
        }
    }
    for (i = 0; i < 25; i++) {
        timer[i] += inc[i]
        timer[i] %= MAX_TIME
    }
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    let px: number;
    let py: any;
    if (name == "increment") {
        px = Math.idiv(value, 5)
        py = value % 5
        for (let dx = -RANGE; dx < RANGE + 1; dx++) {
            for (let dy = -RANGE; dy < RANGE + 1; dy++) {
                if (_py.range(5).indexOf(px + dx) >= 0 && _py.range(5).indexOf(py + dy) >= 0) {
                    timer[5 * (px + dx) + (py + dy)] += INCREMENT
                }
                
            }
        }
    }
    
})
