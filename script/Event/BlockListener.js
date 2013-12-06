$(window).on("blockRobot", function(){
    if(--loopCounter == 0) {
        clearInterval(loopId);
    }
})