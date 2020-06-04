document.getElementById("run").addEventListener("click", init);

function init() {
    document.getElementById("output").innerHTML = "";
    var start = Number(document.getElementById("Start").value);
    var soll = Number(document.getElementById("Soll").value);
    if (start < 0 || soll < 0) {
        document.getElementById("output").innerHTML += "Error ? Start < 0 or Should  < 0 ?";
        return;
    }

    if (start > 1000 || soll > 1000) {
        document.getElementById("output").innerHTML += "Error ? Start < 1000 or Should  < 1000 ?";
        return;
    }
    var x = 0;
    x = start;
    var run = true;
    var round = 0;
    var timePerRound = 0;
    const MinRoundtime = Number(document.getElementById("MinRoundtime").value);
    const MinRoundSize = Number(document.getElementById("MinRoundSize").value);
    if (start > soll) {
        soll += 1000;
    }

    while (run) {
        timePerRound += MinRoundtime;

        x += MinRoundSize;

        round++;
        if (soll <= x) {
            run = false;
            console.log(timePerRound + " min " + "have in Round: " + round);
            document.getElementById("output").innerHTML += "</br>" + timePerRound + " min " + "have in Round: " + round;
            return;
        }
        console.log(timePerRound + " min " + " Round: " + round);
        document.getElementById("output").innerHTML += "</br>" + timePerRound + " min " + " Round: " + round;
    }
    document.getElementById("output").innerHTML += "</br>" + 'end';

}