var bardz = 30;  //մատրիցի բարձրությունը
var layn = 40;  //մատրիցի երկարությունը
var grassCount = 150; //խոտերի սկզբնական քանակը մատրիցում 
var eatGrassCount = 10; //խոտակերների սկզբնական քանակը մատրիցում 
// var gishatichCount = 40;
// var vorsordCount = 8;
// var angelCount = 4;
var matrix = [];


//Լցնենք մատրիցան 0-ներով
for (var i = 0; i < bardz; i++) {
    matrix.push([]);
    for (var j = 0; j < layn; j++) {
        matrix[i].push(0);
    }
}

var side = 25;
 
var grassArr = [];
var grassEaterArr = [];
var gishatichArr = [];
var vorsordArr = [];
var angelArr = [];

function setup() {
    var n = 0;
    while (n < grassCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            n++;
        }
    }
    n=0;
    while (n < eatGrassCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            n++;
        }
    }
    n=0;
    /*while (n < gishatichCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            n++;
        }
    }
    n=0;
    while (n < vorsordCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            n++;
        }
    }
    n=0;
    while (n < angelCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            n++;
        }
    }
    n=0;*/
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    noStroke();

    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var eater = new GrassEater(x,y);
                grassEaterArr.push(eater);
            }
            else if(matrix[y][x] == 3){
                var gish = new Gishatich(x,y);
                gishatichArr.push(gish);
            }
            else if(matrix[y][x] == 4){
                var vorsord = new Vorsord(x,y);
                vorsordArr.push(vorsord);
            }
            else if(matrix[y][x] == 5){
                var angel = new Angel(x,y);
                angelArr.push(angel);
            }
        }
    }

 }

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 0){
                fill("#acacac");
            }
            else if(matrix[y][x] == 2){
                fill("yellow");
            }
            else if(matrix[y][x] == 3){
                fill("red");
            }
            else if(matrix[y][x] == 4){
                fill("black");
            }
            else if(matrix[y][x] == 5){
                fill("#00D4FF");
            }
         
            rect(x * side, y * side, side, side);
        }
    }
    for(var i in grassArr){
        grassArr[i].mul();
    }

    for(var i in grassEaterArr){
        grassEaterArr[i].eat();
    }

    for(var i in gishatichArr){
        gishatichArr[i].eat();
    }

    for(var i in vorsordArr){
        vorsordArr[i].eat();
    }

    for(var i in angelArr){
        angelArr[i].eat();
    }

    if(grassArr.length > 120 && grassEaterArr.length == 0){
        var n = 0;
        while (n < 20) {
            var x = Math.floor(random(0, layn));
            var y = Math.floor(random(0, bardz));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2;
                n++;
                var eater = new GrassEater(x,y);
                grassEaterArr.push(eater);
            }
        }
        for(var i in grassEaterArr){
            grassEaterArr[i].eat();
        } 
    }
    if(grassEaterArr.length > 30 && gishatichArr.length < 10){
        var n = 0;
        while (n < 40) {
            var x = Math.floor(random(0, layn));
            var y = Math.floor(random(0, bardz));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                n++;
                var gish = new Gishatich(x,y);
                gishatichArr.push(gish);
            }
        }
        for(var i in gishatichArr){
            gishatichArr[i].eat();
        } 
    }
    if(gishatichArr.length >= 49 && vorsordArr.length == 0){
        var n = 0;
        while (n < 4) {
            var x = Math.floor(random(0, layn));
            var y = Math.floor(random(0, bardz));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                n++;
                var vorsord = new Vorsord(x,y);
                vorsordArr.push(vorsord);
            }
        }
        for(var i in vorsordArr){
            vorsordArr[i].eat();
        } 
    }
    if(vorsordArr.length!=0 && gishatichArr.length==0){
        for( var i = 0; i < vorsordArr.length; i++){ 
            vorsordArr.splice(i, 1); 
        }
        for (var i = 0; i < bardz; i++) {
            for (var j = 0; j < layn; j++) {
                if(matrix[i][j] == 4){
                    matrix[i][j] = 0;
                }
            }
        }
    }
    if(vorsordArr.length > 7 && angelArr.length == 0){
        var n = 0;
        while (n < 2) {
            var x = Math.floor(random(0, layn));
            var y = Math.floor(random(0, bardz));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                n++;
                var angel = new Angel(x,y);
                angelArr.push(angel);
            }
        }
        for(var i in angelArr){
            angelArr[i].eat();
        } 
    }
    if(angelArr.length!=0 && vorsordArr.length == 0){
        for( var i = 0; i < angelArr.length; i++){ 
            angelArr.splice(i, 1); 
        }
        for (var i = 0; i < bardz; i++) {
            for (var j = 0; j < layn; j++) {
                if(matrix[i][j] == 5){
                    matrix[i][j] = 0;
                }
            }
        }
    }
}