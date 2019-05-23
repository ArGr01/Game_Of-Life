// Create Global Arrays
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
vorsordArr = [];
angelArr = [];
matrix = [];

// Generate the random Matrix
let random = require("./modules/random");
function matrixGenerator(matrixSize, grassCount, grassEaterCount, gishatichCount, vorsordCount, angelCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    var n = 0;
    while(n < grassCount) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if(matrix[customY][customX] == 0) {
            matrix[customY][customX] = 1;
            n++;
        }
    }
    n = 0;
    while (n < grassEaterCount) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if(matrix[customY][customX] == 0) {
            matrix[customY][customX] = 2;
            n++;
        }
    }
    n = 0;
    
    while (n < gishatichCount) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if(matrix[customY][customX] == 0) {
            matrix[customY][customX] = 3;
            n++;
        }
    }
    n = 0;
    while (n < vorsordCount) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if(matrix[customY][customX] == 0) {
            matrix[customY][customX] = 4;
            n++;
        }
    }
    n = 0;
    while (n < angelCount) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if(matrix[customY][customX] == 0) {
            matrix[customY][customX] = 5;
            n++;
        }
    }
    
}
matrixGenerator(30,600,200,50,2,1);

// Requiring modules
var Grass = require("./modules/class-grass.js");
var GrassEater = require("./modules/class-grasseater.js");
var Gishatich = require("./modules/class-gishatich.js");
var Vorsord = require("./modules/class-vorsord.js");
var Angel = require("./modules/class-angel.js");

// Server STUFF
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

// Create Objects
function CreatingObjects(){
	for(var y = 0; y < matrix.length; y++){
        for(var x = 0; x < matrix[y].length; x++){
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
CreatingObjects();

io.on("connection",function(socket){
    socket.on("pushgishatich", function(){
        var n = 0;
        while(n < 20){
            let x = Math.floor(random(30));
            let y = Math.floor(random(30));
            if(matrix[y][x] == 0){
                matrix[y][x] = 3;
                var gish = new Gishatich(x,y);
                gishatichArr.push(gish);
                n++;
            }  
        }
    })
    socket.on("change",function(){
        vorsordArr = [];
        for(var y = 0; y<30; y++){
            for(var x = 0; x<30; x++){
                if(matrix[y][x] == 4){
                    matrix[y][x] = 3;
                    var gish = new Gishatich(x,y);
                    gishatichArr.push(gish);
                }
            }
        }
    })
    socket.on("killangels",function(){
        angelArr = [];
        for(var y = 0; y < 30; y++){
            for(var x = 0; x < 30; x++){
                if(matrix[y][x] == 5)
                    matrix[y][x] = 0;
            }
        }
    })
    socket.on("light",function(){
        let randx = Math.floor(random(30));
        let randy = Math.floor(random(30));
        for(var y = 0; y < 30; y++){
            for(var x = 0; x < 30; x++){
                if((y+x) == (randy + randx) || (y-x) == (randy-randx) || (x==randx && (y==randy-5 || y==randy+5)) || (y==randy && (x==randx-5 || x==randx+5))){
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        if(matrix[y][x] == 1){
                            for(var i in grassArr){
                                if(x  == grassArr[i].x && y == grassArr[i].y){
                                    grassArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 2){
                            for(var i in grassEaterArr){
                                if(x  == grassEaterArr[i].x && y == grassEaterArr[i].y){
                                    grassEaterArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 3){
                            for(var i in gishatichArr){
                                if(x  == gishatichArr[i].x && y == gishatichArr[i].y){
                                    gishatichArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 4){
                            for(var i in vorsordArr){
                                if(x  == vorsordArr[i].x && y == vorsordArr[i].y){
                                    vorsordArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 5){
                            for(var i in angelArr){
                                if(x  == angelArr[i].x && y == angelArr[i].y){
                                    angelArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        matrix[y][x] = 6;
                    }
                }
            }
        }
    })
    socket.on("boom",function(){
        let randx = Math.floor(random(30));
        let randy = Math.floor(random(30));
        for(var y = 0; y < 30; y++){
            for(var x  =0; x < 30; x++){
                if(((y==randy || y==randy-1 || y==randy+1) && (x==randx-1 || x==randx-2 || x==randx-3 || x==randx+1 || x==randx+2 || x==randx+3)) || ((x==randx || x==randx-1 || x==randx+1) && (y==randy-1 || y==randy-2 || y==randy-3 || y==randy+1 || y==randy+2 || y==randy+3)) || ((y==randy-2 || y==randy+2) && (x==randx-2 || x==randx+2)) || ((y==randy-3 || y==randy+3) && (x==randx-3 || x==randx+3)) || ((y==randy-4 || y==randy+4) && (x==randx-4 || x==randx+4))){
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        if(matrix[y][x] == 1){
                            for(var i in grassArr){
                                if(x  == grassArr[i].x && y == grassArr[i].y){
                                    grassArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 2){
                            for(var i in grassEaterArr){
                                if(x  == grassEaterArr[i].x && y == grassEaterArr[i].y){
                                    grassEaterArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 3){
                            for(var i in gishatichArr){
                                if(x  == gishatichArr[i].x && y == gishatichArr[i].y){
                                    gishatichArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 4){
                            for(var i in vorsordArr){
                                if(x  == vorsordArr[i].x && y == vorsordArr[i].y){
                                    vorsordArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        else if(matrix[y][x] == 5){
                            for(var i in angelArr){
                                if(x  == angelArr[i].x && y == angelArr[i].y){
                                    angelArr.splice(i,1);
                                    break;
                                }
                            }
                        }
                        matrix[y][x] = 7;
                    }
                }
            }
        }
    })
});

var changeseason = 0;
var season;

// Start Game, Call Methods
function Game(){
    changeseason++;
    if(changeseason < 20)
        season = "spring";
    else if(changeseason >= 20 && changeseason < 40)
        season = "summer";
    else if(changeseason >= 40 && changeseason < 60)
        season = "automn";
    else if(changeseason >= 60 && changeseason < 80)
        season = "winter";
    else
        changeseason = 0;

	if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            if(season == "spring")
                grassArr[i].mul(3);
            else if(season == "summer")
                grassArr[i].mul(6);
            else if(season == "automn")
                grassArr[i].mul(10);
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            if(season == "spring")
                grassEaterArr[i].eat(4);
            else if(season == "summer")
                grassEaterArr[i].eat(7);
            else if(season == "automn")
                grassEaterArr[i].eat(11);
            else if(season == "winter")
                grassEaterArr[i].eat(50);
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            if(season == "spring")
                gishatichArr[i].eat(1);
            else if(season == "summer")
                gishatichArr[i].eat(2);
            else if(season == "automn")
                gishatichArr[i].eat(3);
            else if(season == "winter")
                gishatichArr[i].eat(4);
        }
    }
    if (vorsordArr[0] !== undefined) {
        for (var i in vorsordArr) {
            vorsordArr[i].eat();
        }
    }
    if (angelArr[0] !== undefined) {
        for (var i in angelArr) {
            angelArr[i].eat();
        }
    }
    
    if(grassArr.length > 120 && grassEaterArr.length == 0){
        var n = 0;
        while (n < 20) {
            var x = Math.floor(random(30));
            var y = Math.floor(random(30));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2;
                n++;
                var eater = new GrassEater(x,y);
                grassEaterArr.push(eater);
            }
        }
    }
    /*
    if(grassEaterArr.length > 30 && gishatichArr.length < 10){
        var n = 0;
        while (n < 40) {
            var x = Math.floor(random(30));
            var y = Math.floor(random(30));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                n++;
                var gish = new Gishatich(x,y);
                gishatichArr.push(gish);
            }
        } 
    }
    */
    if(gishatichArr.length >= 49 && vorsordArr.length == 0){
        var n = 0;
        while (n < 4) {
            var x = Math.floor(random(30));
            var y = Math.floor(random(30));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                n++;
                var vorsord = new Vorsord(x,y);
                vorsordArr.push(vorsord);
            }
        }
    }
    if(vorsordArr.length!=0 && gishatichArr.length==0){
        vorsordArr = [];
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                if(matrix[i][j] == 4){
                    matrix[i][j] = 0;
                }
            }
        }
    }
    if(vorsordArr.length > 7 && angelArr.length == 0){
        var n = 0;
        while (n < 2) {
            var x = Math.floor(random(30));
            var y = Math.floor(random(30));
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                n++;
                var angel = new Angel(x,y);
                angelArr.push(angel);
            }
        }
    }
    /*
    if(angelArr.length!=0 && vorsordArr.length == 0){
        angelArr = [];
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 30; j++) {
                if(matrix[i][j] == 5){
                    matrix[i][j] = 0;
                }
            }
        }
    }
    */
    
    // Object to send
    let sendData = {
        matrix: matrix,
        sendseason: season
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);

}

setInterval(Game, 500);

var statistics = {};
setInterval(function(){
    statistics.grassArr = grassArr.length;
    statistics.grassEaterArr = grassEaterArr.length;
    statistics.gishatichArr = gishatichArr.length;
    statistics.vorsordArr = vorsordArr.length;
    statistics.angelArr = angelArr.length;
    fs.writeFileSync("statistics.json", JSON.stringify(statistics));
},10)