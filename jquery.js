
//slice a fruit
//play sound
//expledoe fruit
//increase code
var playing = false;
var score;
var trialsleft;
var fruits = ["apple","banana","cherries","grapes","mango","peach","pear","pineapple","waterlemon"];
var step;
var action; //used to the set interval

$(function() {
    //click on start/reset button
    $("#startreset").click(function() {
        
        //if we are playing
        if(playing == true) {
          
            //reload the page
            location.reload();
        }
        else {
            
            //show trails left box
            playing = true;
            
            //set score to zero ;
            score=0;
            $("#value").html(score);
            
            //show trailes left box
            $("#traislLeft").show();
            trialsleft = 3;
            //add heart to box
                addHearts();
            
            //hide gameover box
            $("#gameover").hide();
            
            //change text start reset game
            $("#startreset").html("Reset Game");
            
            //start sending function
            startAction();
        }
        
    });

$("#fruit1").mouseover(function(){
    score++;
    $("#value").html(score);
//    document.getElementById("#slicesound").play(); //playsound
    $("#slicesound")[0].play(); //playsound
    
    //stop fruit and hide it
    clearInterval(action);
    
    //hide the fruit
    $("#fruit1").hide("explode",100); //slicing the fruits
    
    //send new fruits
    //setTimeout(startAction(),500);
    startAction();
});
   

//functions
    function addHearts() {
        $("#traislLeft").empty();
        for(i = 0; i< trialsleft ; i++){
                $("#traislLeft").append('<img src="images/heart.png" class ="life"> ');
            }
    }
    function startAction() {
        $("#fruit1").show();
        chooseFruit(); //funtion to choose fruit
        
        //generate randomStep 
        step = Math.round(Math.random()*5)+1; //changing ste step
        
        //move fruit down by one step evrey 10ms
        action = setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top+step);
            
            
            //check if the fruit is to low
            if($("#fruit1").position().top > $("#fruitContainer").height()) {
                
                
                //check if we have any trials left
                if(trialsleft > 1 ){
                     $("#fruit1").show();
                        chooseFruit(); //funtion to choose fruit

                        //generate randomStep 
                        step = Math.round(Math.random()*5)+1; //changing ste step
                        
                        //reduce triales -1
                        trialsleft--;
                        //show right number of hearts 
                        addHearts();
                }
                else {
                    //game over
                    //we are not playing anymore
                    playing=false;
                    
                    //change text of button start/reset
                    $("#startreset").html("Start Game");
                    
                    $("#gameover").show();
                    $("#gameover").html("<p> GAME OVER ! </p><p> YOUR SCORE IS :"+score+" </p>");
                    $("#traislLeft").hide();
                    stopAction();
                }
            
            }
            
        },10);
        
    }
                                

//chose fruit function generate random fruit
 function chooseFruit() {
     var number = Math.round(Math.random()*8);
     
     //chosing fruits from array and random horizontal position
     $("#fruit1").attr('src','images/'+fruits[number]+'.png');
     $("#fruit1").css({'left': Math.round(Math.random()*800), 'top':-50});
 }

//stop dropping fruits
function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}
});