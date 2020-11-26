// const root_url = "https://limitless-headland-02051.herokuapp.com/";
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level");
const id = urlParams.get("id");
const questionsEl = document.querySelector("#questions");
const goHomeEl = document.querySelector('#go_home');
const btn_next = document.querySelector('.q-btn')
var point = 0

function getQuizz(lv, id, callback) {
  const url = `https://limitless-headland-02051.herokuapp.com/${lv}/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
      checkAns(data)
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
                    ádasdasd
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
let checkAns = (data) =>{btn_next.addEventListener('click',()=>{
  // let ans = (document.querySelector('input[name=' + 'r-1' + ' ]:checked').parentElement).textContent.trim()
  let ans = document.querySelector('input[name=' + 'r-1' + ' ]:checked').value
  if(ans == 'true')
  {
    point++
    console.log(point)
  }
})}

async function main() {
  await getQuizz(level, id, generatorQuizz);
}

main();
