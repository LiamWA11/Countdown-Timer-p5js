var counter = 300;
var startTime = 0;

$(document).ready(function(){
    $('input.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 15,
        minTime: '0',
        maxTime: '23:59:59',
        defaultTime: 'now',
        startTime: '10:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true});
});

function fileSelected(file)
{
    console.log(file);
    console.log(split(file.data, ';'));
    document.cookie = "info="+split(file.data, ';')[0];
    document.cookie = "img="+split(file.data, ';')[1];

}

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

    var fileIn = createFileInput(fileSelected);

    var a = "a";

    var timer = select("#timer");
    var school = select("#school");
    var timerTitle = select("#timer_title");
    var time = select("#time");
    var preview = select("#preview");
    var startTimer = select("#button_start_timer");
    var startTimerTime = select("#button_start_timer_at_time");
    var startTime = select("#input_start_timer_at_time");

    var input_school_name = select("#input_school_name");
    var input_timer_title = select("#input_timer_title");
    var input_background_colour = select("#input_background_colour");
    var input_countdown_seconds = select("#input_countdown_seconds");
    var input_repeats = select("#input_repeats");
    var input_alternate = select("#input_alternates");
    var input_alternate_countdown = select("#input_alternate_countdown");
    var input_text_colour = select("#input_text_colour");
    var input_logo_browser = select("#input_browser");

    fileIn.parent(input_logo_browser);

    function updatePreview()
    {
        timer.html(convertSeconds(input_countdown_seconds.value()));
        school.html(input_school_name.value());
        timerTitle.html(input_timer_title.value());
        preview.style("background-color: #"+input_background_colour.value()+"; color: #"+input_text_colour.value());
        startTimer.attribute("href", "timer.html?seconds="+input_countdown_seconds.value()+"&background_colour="+input_background_colour.value()+"&school="+input_school_name.value()+"&repeats="+input_repeats.value()+"&alternating="+input_alternate.value()+"&alternating_timer="+input_alternate_countdown.value()+"&timer_title="+input_timer_title.value()+"&text_colour="+input_text_colour.value()+"&start_time=now");

        startTimerTime.attribute("href", "timer.html?seconds="+input_countdown_seconds.value()+"&background_colour="+input_background_colour.value()+"&school="+input_school_name.value()+"&repeats="+input_repeats.value()+"&alternating="+input_alternate.value()+"&alternating_timer="+input_alternate_countdown.value()+"&timer_title="+input_timer_title.value()+"&text_colour="+input_text_colour.value()+"&start_time="+startTime.value());

        var h = hour();
        var hr = h;
        var timeSuffix = "am";
        if (h > 12)
        {
            hr = h % 12;
            timeSuffix = "pm";
        }
        time.html(nf(hr, 2) + ":" + nf(minute(), 2) + ":" + nf(second(),2) + " " + timeSuffix);
    }

    var interval = setInterval(updatePreview, 100);
}
