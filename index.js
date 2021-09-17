function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(max) {
    var arr = [];
    return function () {
        while (true) {
            var element = getRandomInRange(0, max-1);
            if (!arr.includes(element)){
                arr.push(element);
                return element;
            }
        }
    }
}

function open(value) {
    value.style.transform = "rotate3d(0, 1, 0, 180deg)"
}

function close(value) {
    value.style.transform = "rotate3d(0, 1, 0, 0)";
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function test(urls) {

    function restart() {
        var styleE = document.head.appendChild(document.createElement("style"));

        var length = document.getElementsByClassName("card").length;
        var randomGenerator = random(length);

        Array.from(document.getElementsByClassName("card")).forEach(function (value) {
            var styleE = document.head.appendChild(document.createElement("style"));
            close(value);
            console.log(value.dataset.url);
            var url = urls[randomGenerator()];
            console.log(url);
            styleE.innerHTML = "#main > div:nth-child("+ value.dataset.number +")::after" +
                "{background-color: white;" +
                "border-color: white;}";

            var styleElem = document.head.appendChild(document.createElement("style"));

            styleElem.innerHTML = "#main > div:nth-child("+ value.dataset.number +")::after {background-image: url(" + url +");}";

            value.dataset.background = "white";
            value.dataset.url = url;
        });

        document.getElementById("lose_wrapper").style.visibility = "hidden";
        document.getElementById("win_wrapper").style.visibility = "hidden";
        document.getElementById("footer").innerText = "01:00";
        obj =
            {card1 : null,
                card2: null};
        isIntervalSet = false;
        seconds = 60;
        interval = null;
    }


    const main = document.getElementById("main");
    var length = main.getElementsByClassName("card").length;
    var randomGenerator = random(length);
    var obj =
        {card1 : null,
        card2: null};
    var isIntervalSet = false;
    var seconds = 60;
    var interval = null;
    document.getElementById("win_button").addEventListener("click", restart);
    document.getElementById("lose_button").addEventListener("click", restart);

    Array.from(main.getElementsByClassName("card")).forEach(function (value, index) {
        var styleElem = document.head.appendChild(document.createElement("style"));
        var url = urls[randomGenerator()];
        styleElem.innerHTML = "#main > div:nth-child("+ (index + 1) +")::after {background-image: url(" + url +");}";
        value.dataset.number = index + 1;
        value.dataset.url = url;

        value.addEventListener('click', function (event) {
            var styleE = document.head.appendChild(document.createElement("style"));

            if (!isIntervalSet) {
                interval = setInterval(function () {
                    seconds--;
                    document.getElementById("footer").innerText = str_pad_left(0,'0',2)+':'+str_pad_left(seconds,'0',2);
                    if (seconds === 0) {
                        document.getElementById("lose_wrapper").style.visibility = "visible";
                        clearInterval(interval)
                    }
                }, 1000);
                isIntervalSet = true;
            }

            if (obj.card1 === event.target || obj.card2 === event.target || event.target.dataset.background === "#5AD66F") return;
            console.log(obj.card1);
            console.log(obj.card2);
            if (obj.card1 !== null && obj.card2 !== null) {
                if (obj.card2.dataset.background === "#F44336"  && obj.card1.dataset.background === "#F44336"){
                    close(obj.card1);
                    close(obj.card2);
                    styleE.innerHTML = "#main > div:nth-child("+ obj.card1.dataset.number +")::after,#main > div:nth-child("+ obj.card2.dataset.number +")::after" +
                        "{background-color: white;" +
                        "border-color: white}";
                }

                obj.card1 = null;
                obj.card2 = null;
            }
            if (obj.card1 !== null && obj.card2 === null) obj.card2 = event.target;
            if (obj.card1 === null) obj.card1 = event.target;
            if (obj.card1 !== null && obj.card2 !== null) {
                if (obj.card1.dataset.url === obj.card2.dataset.url) {
                    styleE.innerHTML = "#main > div:nth-child("+ obj.card1.dataset.number +")::after,#main > div:nth-child("+ obj.card2.dataset.number +")::after" +
                        "{background-color: #5AD66F;" +
                        "border-color: #5AD66F}";
                    obj.card1.dataset.background = "#5AD66F";
                    obj.card2.dataset.background = "#5AD66F";
                }
                else {
                    styleE.innerHTML = "#main > div:nth-child("+ obj.card1.dataset.number +")::after,#main > div:nth-child("+ obj.card2.dataset.number +")::after" +
                        "{background-color: #F44336;" +
                        "border-color: #F44336}";
                    obj.card1.dataset.background = "#F44336";
                    obj.card2.dataset.background = "#F44336";
                }
            }

            open(event.target);

            if (Array.from(main.getElementsByClassName("card")).reduce(function (result, value) {
                if (value.dataset.background=== "#5AD66F") {
                    result++;
                }
                return result;
            }, 0) === length) {
                document.getElementById("win_wrapper").style.visibility = "visible";
                clearInterval(interval)
            }
        });

    });
}