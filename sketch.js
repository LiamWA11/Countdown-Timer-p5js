var counter = 300;
var startTime = 0;

function convertSeconds(s)
{
    var seconds = nf(s % 60, 2, 0);
    var minutes = nf(floor((s/60)%60), 2, 0);
    var hours = nf(floor(s / 3600), 2, 0);

    return hours + ':' + minutes + ':' + seconds;
}

function setup()
{
    startTime = millis();


    noCanvas();

    var params = getURLParams();
    var counter = params.seconds;

    var timer = select("#timer");
    var body = select("#body");
    var school = select("#school");

    timer.html(convertSeconds(counter));
    body.style("background-color: #"+params.background_colour)
    school.html((decodeURI(params.school)));

    function timeIt()
    {
        var currentTime = floor((millis() - startTime)/1000);

        timer.html(convertSeconds(counter - currentTime));

        if (counter - currentTime <= 0)
        {
            console.log("TIMER FINISHED")
            clearInterval(interval);
        }
    }

    var interval = setInterval(timeIt, 500);
}
