var total = 0;
var cars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var co = 0;
var curr = 0;
var fill = 0;
var filll = 0;

$("select").on("click", function () {
  $(this).parent(".select-box").toggleClass("open");
});

$(document).mouseup(function (e) {
  var container = $(".select-box");

  if (container.has(e.target).length === 0) {
    container.removeClass("open");
  }
});

$("select").on("change", function () {
  var selection = $(this).find("option:selected").text(),
    labelFor = $(this).attr("id"),
    label = $("[for='" + labelFor + "']");

  label.find(".label-desc").html(selection);
});

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
  total = (Number(total) + Number(curr)).toFixed(3);
   $("#tott")[0].innerHTML = total;
  cars[co] = curr;
    co++;
  fill = fill + 25;
  filll = filll + 20.5;
  $("#container .beer.fill")[0].style.height = fill + "%";
  $("#container .head.active")[0].style.bottom = filll + "%";
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = now * 50 + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          transform: "scale(" + scale + ")",
          position: "absolute",
        });
        next_fs.css({ left: left, opacity: opacity });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack",
    }
  );
});

$(".previous").click(function () {
  fill = fill - 25;
  filll = filll - 20.5;
  $("#container .beer.fill")[0].style.height = fill + "%";
  $("#container .head.active")[0].style.bottom = filll + "%";
  co--;
  total = (Number(total) - Number(cars[co])).toFixed(3);
  $("#tott")[0].innerHTML = total;
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({ left: left });
        previous_fs.css({
          transform: "scale(" + scale + ")",
          opacity: opacity,
        });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack",
    }
  );
});

$(".submit").click(function () {
  return false;
});

$(function () {
  function beerRise() {
    $(".beer").addClass("fill");
    $(".head").addClass("active");
  }

  setTimeout(function () {
    beerRise();
  }, 3000);
});

$(".grid-item").on("click", function (event) {
  var x = $(".grid-item");
  for (let index = 0; index < x.length; index++) {
    x[index].style.background = "";
  }
  event.currentTarget.style.background = "black";

  curr = event.currentTarget.dataset.price;
  $("#tott")[0].innerHTML = Number(total) + Number(curr);
});




function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');

  var draggableElement = $("#"+id)[0];
  const dropzone = event.target;

//   dropzone.appendChild(draggableElement);
var x = $(".grid-item");
  for (let index = 0; index < x.length; index++) {
    x[index].style.background = "";
  }
draggableElement.parentElement.parentElement.parentElement.parentElement.style.background = "black";

 
  $("#container .beer.fill")[0].style.height = "100%";
  $("#container .head.active")[0].style.bottom = "82%";
  curr = draggableElement.dataset.price;
  $("#tott")[0].innerHTML = Number(total) + Number(curr);

  event
    .dataTransfer
    .clearData();
}

function onDragOver(event) {
  event.preventDefault();
}
function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

//   event
//     .currentTarget
//     .style
//     .backgroundColor = 'yellow';
}