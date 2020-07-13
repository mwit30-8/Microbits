const num:number = 513;
const swap:number[]=[1000, 100];
const pick:number[]=[75, 10];


let population:boolean[];

function _init_(num:number):void{
    population=[];
    while(population.length<num){
        population.push(false);
    }
}
function sort(swap:number[]):void{
    let shake:number=Math.floor(generateGaussianNoise(swap[0], swap[1]));
    for(let i:number=0;i<shake;i++){
        let a:number=randint(0, num-1);
        let b:number=randint(0, num-1);
        let _a:boolean=population[a];
        let _b:boolean=population[b];
        population[a]=_b;
        population[b]=_a;
    }
}
function mark(pick:number[]):number{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    for(let i:number=0;i<pickup;i++){
        population[i]=true;
    }
    return pickup;
}
function check(pick:number[]):number[]{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    let marked:number=0;
    for(let i:number=0;i<pickup;i++){
        if(population[i]){
            marked++;
        }
    }
    return [pickup,marked];
}
function showCheck(pick:number[]):boolean[]{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    let op:boolean[]=[]
    for(let i:number=0;i<pickup;i++){
        op.push(population[i])
    }
    return op;
}
function process(num:number,swap:number[],pick:number[]):number[]{
    _init_(num);
    let m1:number=mark(pick);
    sort(swap);
    let checking:number[]=check(pick);
    let t2=checking[0];
    let m2=checking[1];
    let p=(t2/m2)*m1;
    return [m1,t2,m2,p];
}
function generateGaussianNoise(mu:number, sigma:number):number{
	const epsilon:number = 0;
	const two_pi:number = 2.0 * Math.PI;
    let rng:boolean=Math.randomBoolean();
	let u1:number, u2:number;
	do {
		u1 = Math.random();
		u2 = Math.random();
	} while (u1 <= epsilon);

	let z0:number = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(two_pi * u2);
	// auto z1 = sqrt(-2.0 * log(u1)) * sin(two_pi * u2); // not used here!

	return z0 * sigma + mu;
}
basic.forever(function () {
    _init_(num);
    mark([25,0]);
    led.setBrightness(64);
    for(let x:number=0;x<5;x++){
        for(let y:number=0;y<5;y++){
            led.plot(x, y);
        }
    }
    basic.pause(100);
    let shake:number=Math.floor(generateGaussianNoise(swap[0], swap[1]));
    led.setBrightness(128);
    for(let i:number=0;i<shake;i++){
        let a:number=randint(0, num-1);
        let b:number=randint(0, num-1);
        let _a:boolean=population[a];
        let _b:boolean=population[b];
        population[a]=_b;
        population[b]=_a;
        if(a<25){
            if(_b){
                led.plot(a%5, Math.floor(a/5));
            }else{
                led.unplot(a%5, Math.floor(a/5));
            }
        }
        if(b<25){
            if(_a){
                led.plot(b%5, Math.floor(b/5));
            }else{
                led.unplot(b%5, Math.floor(b/5));
            }
        }
        basic.pause(1);
    }
    basic.pause(500);
    led.setBrightness(255);
    let screen=showCheck([25,0]);
    for(let x:number=0;x<5;x++){
        for(let y:number=0;y<5;y++){
            if(screen[x+5*y]){
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
    basic.pause(1000);
    let console:number[];
    for(let i = 0; i < randint(0, 100); i++) {
        console=process(num,swap,pick);
    }
    serial.writeNumbers(console);
})