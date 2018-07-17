var counter = 300;
var startTime = 0;
var timer_sound;

function convertSeconds(s)
{
    var seconds = nf(s % 60, 2, 0);
    var minutes = nf(floor((s/60)%60), 2, 0);
    var hours = nf(floor(s / 3600), 2, 0);

    return hours + ':' + minutes + ':' + seconds;
}

function preload()
{
    soundFormats('mp3', 'ogg');
    timer_sound = loadSound("timer_sound.mp3");
}

function setup()
{
    console.log(document.cookie);
    console.log("Loading Timer");
    // URL Parameters:
    // seconds: Amount of seconds for timer
    // background_colour: Background colour of timer
    // school
    // repeats
    // alternating
    // alternating_timer

    startTime = millis();


    noCanvas();

    var running = false;
    var sx = -1;

    var params = getURLParams();
    console.log(params);
    var counter = params.seconds;
    var counterOriginal = counter;
    var repeatTimer = params.repeats;
    var alternatingCounter = params.alternating_timer;
    var alternating = params.alternating;
    var startTimerTime = params.start_time;
    var isAlternative = true;
    var textColour = params.text_colour;

    var timer = select("#timer");
    console.log(timer);
    var body = select("#body");
    var school = select("#school");
    var timerTitle = select("#timer_title");
    var time = select("#time");

    console.log(counter);
    timer.html(convertSeconds(counter));
    body.style("background-color: #"+params.background_colour+"; color: #"+textColour);
    school.html((decodeURI(params.school)));
    timerTitle.html(decodeURI(params.timer_title));

    function timeIt()
    {
        //console.log(startTimerTime,hour(),minute(),second(),sx);
        if (!running)
        {
            if (sx === -1)
            {
                sx = second();
                console.log(sx)
            }
            if (second() != sx)
            {
                startTime = millis();
                if (startTimerTime === "now")
                {
                    running = true;
                }
                else if (startTimerTime === (hour()+":"+minute()))
                {
                    running = true;
                }
            }
        }

        if (running)
        {
            var h = hour();
            var hr = h;
            var timeSuffix = "am";
            if (h > 12)
            {
                hr = h % 12;
                timeSuffix = "pm";
            }
            console.log(hr + "," + minute() + "," + second());
            time.html(nf(hr, 2) + ":" + nf(minute(), 2) + ":" + nf(second(),2) + " " + timeSuffix);
            var currentTime = floor((millis() - startTime)/1000);

            timer.html(convertSeconds(counter - currentTime));

            if (counter - currentTime <= 0)
            {
                console.log(repeatTimer);
                if (repeatTimer === "true")
                {
                    if (alternating === "true")
                    {
                        if (isAlternative)
                        {
                            console.log("Repeating Alternative Timer");
                            counter = alternatingCounter;
                            startTime = millis();
                            isAlternative = false;
                            timer_sound.play();
                        }
                        else
                        {
                            console.log("Repeating Alternative Timer");
                            counter = counterOriginal;
                            startTime = millis();
                            isAlternative = true;
                            timer_sound.play();
                        }
                    }
                    else
                    {
                        console.log("Repeating Timer");
                        counter = counterOriginal;
                        startTime = millis();
                        timer_sound.play();
                    }
                }
                else
                {
                    console.log("TIMER FINISHED");
                    clearInterval(interval);
                    timer_sound.play();
                }
            }
        }
    }

    var interval = setInterval(timeIt, 10);
}
