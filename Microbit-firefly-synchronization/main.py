MAX_TIME = 50
ON_DURATION = 10
RANGE = 2
INCREMENT = 1

timer = [0]
ticked = [False]
for i in range(25):
    timer[i] = randint(0,MAX_TIME)
    ticked[i] = False

radio.set_group(58)

def on_forever():
    inc = [0]
    for px in range(5):
        for py in range(5):
            i=5*px+py
            out = False
            inc[i] = 0
            inc[i] += 1
            if not led.point(px, py) and timer[i] < ON_DURATION:
                led.plot(px, py)
                radio.send_value("increment", i)
                for dx in range(-RANGE, RANGE+1):
                    for dy in range(-RANGE, RANGE+1):
                        if px + dx in range(5) and py + dy in range(5):
                            inc[5*(px+dx)+(py+dy)] += INCREMENT
            if led.point(px, py) and timer[i] > ON_DURATION:
                led.unplot(px, py)
    for i in range(25):
        timer[i] += inc[i]
        timer[i] %= MAX_TIME

def on_received_value(name, value):
    if name == "increment":
        px = value // 5
        py = value % 5
        for dx in range(-RANGE, RANGE+1):
            for dy in range(-RANGE, RANGE+1):
                if px + dx in range(5) and py + dy in range(5):
                    timer[5*(px+dx)+(py+dy)] += INCREMENT

basic.forever(on_forever)
radio.on_received_value(on_received_value)