const view = {
    showTimer() {
        let D = new Date().getTime()
        distance = D - (1604990689818 + 2 * 60 * 1000)
        var seconds = Math.floor(distance / 1000)
        var interval = setInterval(function () {
            seconds--;
            $('.timer').text(seconds);
            if (seconds === 0) {
                clearInterval(interval)
            };
        }, 1000);

    }
}







