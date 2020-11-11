const view = {
    showTimer(data) {
        // let D = new Date().getTime()
        // distance = D - (seconds + 2 * 60 * 1000)
        // var t = Math.floor(distance / 1000)
        // var interval = setInterval(function () {
        //     t--;
        //     $(`.timer${i}`).text(t);
        //     if (t === 0) {
        //         clearInterval(interval)
        //     };
        // }, 1000);
        
        let dom = document.querySelector('.el-wapper')
        dom.innerHTML =''
        for (let i = 0; i < data.length; i++) {
            let html = `<div class="card">
      <div class="timer${i}"></div>
      <h1 style="text-align: center">${data[i].name}</h1>
     <div style="text-align: center;"><button id="bt${i}" type="button" class="btn btn-success">Remove</button></div>   
     </div>`
            dom.innerHTML += html
            let D = new Date().getTime()
            distance = (data[i].timer + 60 * 1000) - D
            let t = Math.floor(distance / 1000)
            let interval = setInterval(function () {
                t--;
                $(`.timer${i}`).text(t);
                if (t <= 0) {
                    clearInterval(interval)
                    document.querySelector(`.timer${i}`).innerHTML = "Bye"
                };
            }, 1000);
        }

        controller.removeControl()
    },
    test() {
        console.log(model.listTeam)
    }
}