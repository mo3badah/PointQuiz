//اعدادات يجب التعامل معها قبل البدء في استخدام Canvas
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
// width and height variables
let wd = canvas.offsetWidth,
    hg = canvas.offsetHeight;
let allChoices = document.querySelector('.all span');
let coChoices = document.querySelector('.correct span');
let ncoChoices = document.querySelector('.incorrect span');
// set choices
let Cone = document.querySelector('.choice div label[for="one"]');
let Ctwo = document.querySelector('.choice div label[for="two"]');
let Cthree = document.querySelector('.choice div label[for="three"]');

let correctAnswer;

// making the X axis
ctx.beginPath();
ctx.moveTo(0,hg/2);
ctx.lineTo(wd,hg/2);
ctx.lineWidth = 4;
ctx.strokeStyle= 'black';
ctx.stroke();

// making the Y axis
ctx.beginPath();
ctx.moveTo(wd/2,0);
ctx.lineTo(wd/2,hg);
ctx.lineWidth = 4;
ctx.strokeStyle= 'black';
ctx.stroke();

// draw arrows
// up arrow
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 4;
ctx.moveTo(wd/2,0);
ctx.lineTo(wd/2 + hg/36 ,hg/24);
ctx.arc(wd/2,hg/24,7,0,Math.PI,true);
ctx.fill();
// down arrow
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 4;
ctx.moveTo(wd/2,hg);
ctx.lineTo(wd/2 + hg/36 ,hg - hg/24);
ctx.arc(wd/2,hg - hg/24,7,0,Math.PI,false);
ctx.fill();
// left arrow
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 4;
ctx.moveTo(0,hg/2);
ctx.lineTo(wd/24 ,hg/2+hg/32);
ctx.arc(wd/24,hg/2,7,Math.PI/2,Math.PI*3/2,false);
ctx.fill();
// right arrow
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 4;
ctx.moveTo(wd,hg/2);
ctx.lineTo(wd-wd/24 ,hg/2+hg/32);
ctx.arc(wd-wd/24,hg/2,7,Math.PI/2,Math.PI*3/2,true);
ctx.fill();

// Making the lines vertically
let lx=0;
let startnumx = 6;
while(lx<wd){

        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.moveTo(0, lx);
        ctx.lineTo(wd, lx);
        ctx.stroke();
        ctx.beginPath();
        ctx.textAlign = 'start';
        ctx.fillText(`${startnumx}`,wd/2,lx);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        lx+=wd/12;
        startnumx--;
}

let ly=0;
let startnumy = -6;
while(ly<hg){

        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.moveTo(ly, 0);
        ctx.lineTo(ly, hg);
        ctx.stroke();
        ctx.beginPath();
        ctx.textAlign = 'start';
        ctx.fillText(`${startnumy}`,ly,hg/2);
        ctx.strokeStyle = 'black';
        ctx.fill();
        ly+=hg/12;
        startnumy++;


}
//  تقسيم المزبعاث ذاث العشزة مليمتز إلى اجزاء لكل ملم
// عن طريق عمل خطوط بيضاء صغيرة تتخلل الخطوط الزرقاء
let wlx=0;
while(wlx<wd){

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = .5;
        ctx.moveTo(0, wlx);
        ctx.lineTo(wd, wlx);
        ctx.stroke();
        wlx+=wd/120;

}

let wly=0;
while(wly<hg){

        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = .5;
        ctx.moveTo(wly, 0);
        ctx.lineTo(wly, hg);
        ctx.stroke();
        wly+=hg/120;

}
//
function refresh() {
    if (!window.localStorage.getItem('correct')) {
        window.localStorage.setItem('correct', 0);
    }
    let Cvalue = parseInt(window.localStorage.getItem('correct'));
    coChoices.textContent = Cvalue;
    if (!window.localStorage.getItem('incorrect')) {
        window.localStorage.setItem('incorrect', 0);
    }
    let NCvalue = parseInt(window.localStorage.getItem('incorrect'));
    ncoChoices.textContent = NCvalue;
    allChoices.textContent = Cvalue+NCvalue;
}
refresh();
function initialNewOne() {
    ctx.beginPath();
    ctx.fillStyle= 'red';
    ctx.arc((initW+6)*wd/12,(initH+6)*hg/12,5,0,2*Math.PI,true);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo((initW+6)*wd/12,hg/2);
    ctx.lineTo((initW+6)*wd/12,(initH+6)*hg/12);
    ctx.lineTo(wd/2,(initH+6)*hg/12);
    ctx.stroke();
}
function initialNewOnes(x,y) {
    ctx.beginPath();
    ctx.fillStyle= 'green';
    ctx.arc((x+6)*wd/12,(y+6)*hg/12,5,0,2*Math.PI,true);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo((x+6)*wd/12,hg/2);
    ctx.lineTo((x+6)*wd/12,(y+6)*hg/12);
    ctx.lineTo(wd/2,(y+6)*hg/12);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.textAlign = 'start';
    ctx.fillText(`(${x},${-1*y})`,(x+6)*wd/12+10,(y+6)*hg/12-10);
    ctx.font = '20px arial';
    ctx.fill();
}
let initW = getRandomInt(-6,6);
let initH = getRandomInt(-6,6);
function getRandomInt(min,max) {
    //  return Math.floor(Math.random() * (max - min + 1)) + min;
    let imn = Math.floor(Math.random() * (max - min + 1)) + min;
    return imn;
}
initialNewOne();
// check the values
feeding();

let checkBtn = document.querySelector('button[type=submit]');
checkBtn.onclick = function (e) {
    let result = document.querySelector('input[name="choice"]:checked').id;
    if (result === correctAnswer){
        update(true);
    }else {
        update(false);
    }
    // e.preventDefault();
}
function update(x) {
    if (x){
        if (!window.localStorage.getItem('correct')) {
            window.localStorage.setItem('correct', 0);
        }
        let Cvalue = parseInt(window.localStorage.getItem('correct'));
        window.localStorage.setItem('correct', Cvalue + 1);
    }else {
        if (!window.localStorage.getItem('incorrect')) {
            window.localStorage.setItem('incorrect', 0);
        }
        let NCvalue = parseInt(window.localStorage.getItem('incorrect'));
        window.localStorage.setItem('incorrect', NCvalue + 1);
    }
    refresh();
}
// feeding choices and avoiding the same points with reflection to the correct answer
function feeding() {
    if(getRandomInt(1,3)===1){
        correctAnswer = 'one';
        Cone.innerHTML = `(${initW},${-1*initH})`;
        let counter =0;
        while (counter<2){
            let ix = getRandomInt(-6,6);
            let iy = getRandomInt(-6,6);
            if (ix !== initW || iy !== -1*initH){
                if (counter === 0){
                    Ctwo.innerHTML = `(${ix},${iy})`;
                    counter++;
                }else {
                    Cthree.innerHTML = `(${ix},${iy})`;
                    counter++;
                }

            }
        }
    }else if(getRandomInt(1,3)===2){
        correctAnswer = 'two';
        Ctwo.innerHTML = `(${initW},${-1*initH})`;
        let counter =0;
        while (counter<2){
            let ix = getRandomInt(-6,6);
            let iy = getRandomInt(-6,6);
            if (ix !== initW || iy !== -1*initH){
                if (counter === 0){
                    Cone.innerHTML = `(${ix},${iy})`;
                    counter++;
                }else {
                    Cthree.innerHTML = `(${ix},${iy})`;
                    counter++;
                }

            }
        }
    }else{
        correctAnswer = 'three';
        Cthree.innerHTML = `(${initW},${-1*initH})`;
        let counter =0;
        while (counter<2){
            let ix = getRandomInt(-6,6);
            let iy = getRandomInt(-6,6);
            if (ix !== initW || iy !== -1*initH){
                if (counter === 0){
                    Cone.innerHTML = `(${ix},${iy})`;
                    counter++;
                }else {
                    Ctwo.innerHTML = `(${ix},${iy})`;
                    counter++;
                }
            }
        }
    }
}
initialNewOnes(2,-3);
initialNewOnes(-1.5,2.5);
initialNewOnes(-3,-1);
initialNewOnes(0,0);
