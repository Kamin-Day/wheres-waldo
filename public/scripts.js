window.addEventListener("load", function(){	






	var checkGuess = function(event){
		
		searchX = event.offsetX;
		searchY = event.offsetY;

		// debugger;
	
		var request = new XMLHttpRequest();
		request.open("POST", "/check_click?x=" + searchX +"&y=" + searchY);
		request.send()
		
		// request.addEventListener("load", refillCanvas)
		request.addEventListener("load", showResult)
	}
	var startGame = function(event){
		stopwatch.start();
		modal.style.display = "none";


	}

	var showResult = function(event){
		var result = event.target;
		debugger;
		if (result.response == "true"){
			stopwatch.stop();
			modal.style.display = "block";
			startButton.style.display = "none"
			addRecord.style.display = "block"
			addRecord.innerHTML = '<h1> Nice work! You found Waldo in ' + stopwatch.display.innerText +'! </h1> <form method="POST" action="/new_record"> <fieldset> <input type="text" name="player_name" placeholder="Enter your name...">   <input type="hidden" name="time" value="' + stopwatch.display.innerText +'""><input id="submit_score"type="submit" value="Submit & Play Again"></fieldset></form><br>'
			// var submitButton = document.getElementById("submit_score")
			// submitButton.addEventListener("click", function(){
			// 	if 
			// 	event.preventDefault();
			// 	alert("Please enter your name")
			// });
		

	
		} else {
			alert("Sorry, thats not Waldo!");
		}
	}
		// if (searchX >= 420 && searchX <= 453 && searchY >=197 && searchY <= 279){
		// 	alert("You found Waldo!")
		// } else {
		// 	alert("Sorry! Thats not Waldo..")
		//

	var gameField = document.getElementById("game_img");
	gameField.addEventListener("click", checkGuess)

	var modal = document.getElementsByClassName("modal")[0]

	var startButton = document.getElementsByClassName("start_button")[0];
	startButton.addEventListener("click", startGame)

	var addRecord = document.getElementById("add_player_score");

	var showRecrods = document.getElementById("records");




//	var stopwatch = new Stopwatch();
class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

 stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));
});