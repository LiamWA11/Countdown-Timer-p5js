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
    noCanvas();

    var timer = select("#timer");
    var school = select("#school");
    var timerTitle = select("#timer_title");
    var time = select("#time");
    var preview = select("#preview");

    var input_school_name = select("#input_school_name");
    var input_timer_title = select("#input_timer_title");
    var input_background_colour = select("#input_background_colour");
    var input_countdown_seconds = select("#input_countdown_seconds");


    function updatePreview()
    {
        timer.html(convertSeconds(input_countdown_seconds.value()));
        school.html(input_school_name.value());
        timerTitle.html(input_timer_title.value());
        preview.style("background-color: #"+input_background_colour);

        var h = hour();
        var timeSuffix = "am";
        if (h > 12)
        {
            var hr = h % 12;
            timeSuffix = "pm";
        }
        time.html(nf(hr, 2) + ":" + nf(minute(), 2) + ":" + nf(second(),2) + " " + timeSuffix);
    }

    var interval = setInterval(updatePreview, 100);
}
