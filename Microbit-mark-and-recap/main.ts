const num:number = 513;
const swap:number[]=[1000, 100];
const pick:number[]=[75, 10];
// param for console log only;

class population{
    public population:boolean[];
    public num:number;
constructor(num:number){
    this.population=[];
    this.num=num;
    while(this.population.length<num){
        this.population.push(false);
    }
}
public _init_(num:number):void{
    this.population=[];
    while(this.population.length<num){
        this.population.push(false);
    }
}
public sort(swap:number[]):void{
    let shake:number=Math.floor(generateGaussianNoise(swap[0], swap[1]));
    for(let i:number=0;i<shake;i++){
        let a:number=randint(0, this.num-1);
        let b:number=randint(0, this.num-1);
        let _a:boolean=this.population[a];
        let _b:boolean=this.population[b];
        this.population[a]=_b;
        this.population[b]=_a;
    }
}
public mark(pick:number[]):number{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    for(let i:number=0;i<pickup;i++){
        this.population[i]=true;
    }
    return pickup;
}
public check(pick:number[]):number[]{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    let marked:number=0;
    for(let i:number=0;i<pickup;i++){
        if(this.population[i]){
            marked++;
        }
    }
    return [pickup,marked];
}
public showCheck(pick:number[]):boolean[]{
    let pickup:number=Math.floor(generateGaussianNoise(pick[0], pick[1]));
    let op:boolean[]=[]
    for(let i:number=0;i<pickup;i++){
        op.push(this.population[i])
    }
    return op;
}
public process(num:number,swap:number[],pick:number[]):number[]{
    this._init_(num);
    let m1:number=this.mark(pick);
    this.sort(swap);
    let checking:number[]=this.check(pick);
    let t2=checking[0];
    let m2=checking[1];
    let p=(t2/m2)*m1;
    return [m1,t2,m2,p];
}
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
    // local param for screen
    let screen:population=new population(50);
    screen.mark([25,0]);
    led.setBrightness(64);
    for(let x:number=0;x<5;x++){
        for(let y:number=0;y<5;y++){
            if(screen.population[x+5*y]){
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
    basic.pause(100);
    let shake:number=Math.floor(generateGaussianNoise(swap[0], swap[1]));
    led.setBrightness(128);
    for(let i:number=0;i<shake;i++){
        let a:number=randint(0, screen.num-1);
        let b:number=randint(0, screen.num-1);
        let _a:boolean=screen.population[a];
        let _b:boolean=screen.population[b];
        screen.population[a]=_b;
        screen.population[b]=_a;
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
    let scr=screen.showCheck([25,0]);
    for(let x:number=0;x<5;x++){
        for(let y:number=0;y<5;y++){
            if(scr[x+5*y]){
                led.plot(x, y);
            } else {
                led.unplot(x, y);
            }
        }
    }
    basic.pause(1000);
    let console:population=new population(num);
    let cons:number[];
    for(let i = 0; i < randint(0, 100); i++) {
        cons=console.process(num,swap,pick);
    }
    serial.writeNumbers(cons);
})