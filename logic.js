
var words = ['ABOUT', 'ACTOR','CHART', 'CAUSE', 'CRAFT', 'CLOWN', 'ISSUE', 'LIMIT', 'LEVEL', 'MONTH','MIXED', 'SPEED', 'SPLIT', 'THREE', 'THINK', 'TOWER', 'TRACK', 'YIELD']; // word list
var input = document.getElementById('guess'); 
var button = document.getElementById('button'); 
var guess;


var changeClass = function(cng, old, newClass){
  cng.className = cng.className.replace(old, newClass);
}


var gameloop = function(){

  var rand = words[Math.floor(Math.random() * words.length)];
  var hasDuplicates = (/([a-zA-Z]).*?\1/).test(rand);
  
  var pressn = 1; 
  
 
  var getAllIndexes = function(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
  }
  
 
  document.getElementById("row1").firstElementChild.innerHTML=rand[0];
  

  input.onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
      document.getElementById('smallMsg').innerHTML = "Green = correct letter, Yellow = wrong place"; 
      guess = input.value.toUpperCase();
      
      var current = "row" + pressn;
    
      var childDivs = document.getElementById(current).getElementsByTagName('div');
      var c = 0; 
      

      if(guess.length !== 5){
        document.getElementById('smallMsg').innerHTML = "Guesses must be 5 letters!";
        if(pressn===5){
          end("Sorry, you lost.", "Correct word: " + rand);
        }
        pressn++;
        document.getElementById(current).firstElementChild.innerHTML=rand[0];
        return; 
      }

    
      for(var i=0; i<childDivs.length; i++) {
        childDivs[i].innerHTML = guess[i];
        
        
        if(guess[i] == rand[i]){
          changeClass(childDivs[i], 'default', 'correct');
          c++;
        } 
      
        else if(rand.indexOf(guess[i])!=-1){
          if(hasDuplicates === false && childDivs[rand.indexOf(guess[i])].className != "square correct"){
            changeClass(childDivs[i], 'default', 'wrongplace');
          } 
 
          else if(hasDuplicates === true){
            var ind = getAllIndexes(rand, guess[i]);
            if (ind.length > 1){
              for (var j=0; j<ind.length;j++){
                if(childDivs[ind[j]].className != "square correct" && childDivs[i].className != "square wrongplace"){
                  changeClass(childDivs[i], 'default', 'wrongplace');
                } 
              } 
            } 
            else if (childDivs[rand.indexOf(guess[i])].className != "square correct"){
              changeClass(childDivs[i], 'default', 'wrongplace');
            } 
          } 
        } 
        
        input.value = ""; 
        
        if(c===5) { 
          end("Congrats, you won!", "Play Again?");
        } //if
        else if (pressn === 5){
          end("Sorry, you lost.", "Correct word: " + rand);
        } 
      } 
      pressn++; 
    } 
  }  
} 


var end = function(msg, smallmsg){
  document.getElementById('msgBox').innerHTML = msg;
  document.getElementById('smallMsg').innerHTML = smallmsg;
  changeClass(button, "invisible", "visible");
  document.getElementById('guess').readOnly = true;
}


var playagain = function(){
  document.getElementById('msgBox').innerHTML="Guess the Word!"; 
  document.getElementById('smallMsg').innerHTML = "Green = correct letter, Yellow = wrong place"; 
  document.getElementById('guess').readOnly = false;
  changeClass(button, "visible", "invisible");
  

  for(var i=1;i<6;i++){
    var resets = document.getElementById('row'+i).getElementsByTagName('div');
    for(var j=0;j<5;j++){
      resets[j].innerHTML="";
      if(resets[j].className == "square correct" || resets[j].className == "square wrongplace"){
        changeClass(resets[j], "correct", "default");
        changeClass(resets[j], "wrongplace", "default");
      } 
    } 
  } 
 
  gameloop();
};


gameloop();

