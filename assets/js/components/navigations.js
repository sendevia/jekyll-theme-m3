function changeNav() {
  $("div").find(".material-navigation-rail").attr("class", "material-navigation-bar");
}

if ($(document.body).width() <= 768) {
  changeNav();
}

$(window).resize(function () {
  var bodyWidth = $(document.body).width();
  if (bodyWidth > 768) {
    $("div").find(".material-navigation-bar").attr("class", "material-navigation-rail");
  } else {
    changeNav();
  }
});
