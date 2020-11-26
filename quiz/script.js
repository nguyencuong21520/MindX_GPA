$(".start-survey").click(function (event) {
  event.preventDefault();
  startQuiz();
});
$(".q-btn").click(function (event) {
  event.preventDefault();
  nextQuestion();
  co
});
$(".question").on("change", "input", function () {
  $(".question.q-active .ans-wrap").removeClass("ans-selected");
  $(this).parent().addClass("ans-selected");
});

function startQuiz() {
  $("#q-loader").show();
  setTimeout(function () {
    $(".survey-intro").hide();
    $("#q-loader").hide();
    $(".survey-questions").show();


    //show clock
    $("#clock").show();

    //countdown
    window.count = 30
      console.log(count)
      //document.getElementById("clock").innerHTML = time
      window.time = setInterval(function(){
        document.getElementById("clock").innerHTML = count
        count--
        if (count < 0) clearInterval(time)
    },1000) 
  }, 500);
}

function nextQuestion() {
  window.count = 30
  if ($(".question.q-active .ans").is(":checked")) {
    $("#q-loader").show();
    setTimeout(function () {
      $("#q-loader").hide();
      $(".question.q-active")
        .removeClass("q-active")
        .next()
        .addClass("q-active");
    }, 500);
  } else {
    $(".question.q-active .ans-wrap").addClass("q-warning");
    setTimeout(function () {
      $(".question.q-active .ans-wrap").removeClass("q-warning");
    }, 400);
  }
  if ($(".question.q-last .ans").is(":checked")) {
    finishQuiz();
  }
}

function finishQuiz() {
  $("#q-loader").show();
  setTimeout(function () {
    $(".survey-questions").hide();
    $("#q-loader").hide();
    $(".survey-exit").show();
  }, 500);
}
