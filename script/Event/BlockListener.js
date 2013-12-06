$(window).on("blockRobot", function(){
    if(0 === --loopCounter) {
        clearInterval(loopId);
    }
})