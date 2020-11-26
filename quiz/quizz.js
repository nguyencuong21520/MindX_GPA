// const root_url = "https://limitless-headland-02051.herokuapp.com/";
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level");
const id = urlParams.get("id");
const questionsEl = document.querySelector("#questions");
const goHomeEl = document.querySelector('#go_home');
const btn_next = document.querySelector('.q-btn')
const btnStart = document.querySelector('.start-survey')
var point = 0
var index = 0

function getQuizz(lv, id, callback) {
  const url = `https://limitless-headland-02051.herokuapp.com/${lv}/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
      checkAns()
      countDownTime(data)
    })
    .catch((err) => console.log(err));
}

function generatorQuizz(quizzs) {
  let generatorHTML = "";
  for (let i = 0; i < quizzs.length; i++) {
    if (i == 0) {
      const ans = generatorAns(quizzs[i].answerOptions);
      generatorHTML += `
            
            <div class="question q-${i + 1} q-first q-active">
                <div class="q-title">${quizzs[i].questionText}</div>
                ${
                  quizzs[i].image
                    ? `<img class="quizz-image" src="${quizzs[i].image}" />`
                    : ""
                }
                <div class="answers">
                    ${ans}
                </div>
            </div>
            `;
    } else if (i === quizzs.length - 1) {
      const ans = generatorAns(quizzs[i].answerOptions);
      generatorHTML += `

            <div class="question q-${i + 1} q-last">
                <div class="q-title">${quizzs[i].questionText}</div>
                ${
                  quizzs[i].image
                    ? `<img class="quizz-image" src="${quizzs[i].image}" />`
                    : ""
                }
                <div class="answers">
                    ${ans} 
                </div>
            </div>

            `;
    } else {
      const ans = generatorAns(quizzs[i].answerOptions);
      generatorHTML += `
            <div class="question q-${i + 1}">
                <div class="q-title">${quizzs[i].questionText}</div>
                ${
                  quizzs[i].image
                    ? `<img class="quizz-image" src="${quizzs[i].image}" />`
                    : ""
                }
                <div class="answers">
                    ${ans}
                </div>
            </div>
            `;
    }
  }

  questionsEl.insertAdjacentHTML("afterbegin", generatorHTML);
}

function generatorAns(ans) {
  let ansHTML = "";
  for (let i = 0; i < ans.length; i++) {
    ansHTML += `
        <label class="ans-wrap">
            <input class="ans" value='${ans[i].isCorrect}' type="radio" name="r-1" />
            <span class="ans-text">${ans[i].answerText}</span>
        </label>
        `;
  }
  return ansHTML;
}

// Go back to the homepage, and you can check the answer here

goHomeEl.addEventListener('click', () => {
  // Chekc ans 
  // do something
  localStorage.setItem('point',point)
  // back to the homepage
  window.location.href = "./end.html"
})
btnStart.addEventListener('click',()=>{
  
})
let checkAns = () =>{btn_next.addEventListener('click',()=>{
  // let ans = (document.querySelector('input[name=' + 'r-1' + ' ]:checked').parentElement).textContent.trim()
  let ans = document.querySelector('input[name=' + 'r-1' + ' ]:checked').value
  if(ans == 'true')
  {
    point++
  }
})}
let countDownTime = (data) =>{
  let dom1 = document.querySelector('#hint')
  console.log("data",data)

      //document.getElementById("clock").innerHTML = time
    let  timer = setInterval(function(){
      let index = window.index_q
      if(index == undefined){
        index = 0;
      }
        let t = window.time
        let lengthOfHints = data[index].hints.length
        let distand = Math.floor(20/(lengthOfHints + 1))
        if (t == 19){
          dom1.innerHTML = ''
        }
      for(let i=0; i<= lengthOfHints;i++){
        if(t == distand*(lengthOfHints - i)){
        // dom1.innerHTML += `<h1>${data[index].hints[i]}</h1>`
        console.log(data[index].hints[i]["hint"+ (i+1)])
        }
      }
        
        // if( t == 15){
          
        //   console.log(data[index].hints[0].hint1)
        // }
        // if( t == 10){
        //   dom1.innerHTML += `<h1>${data[index].hints[1].hint2}</h1>`
        //   console.log(data[index].hints[1].hint2)
        // }
    },1000) 
}

async function main() {
  await getQuizz(level, id, generatorQuizz);
}

main();
