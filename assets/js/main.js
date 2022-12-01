window.addEventListener("scroll", isScroll);

function isScroll() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var header = document.querySelector(".content-header");
  if (scrollY >= 400) {
    header.style.opacity = "0";
  } else {
    header.style.opacity = "1";
  }
}

$(function () {
  var currentPage = window.location.pathname;
  $("a[href='" + currentPage + "']")
    .find("#segment-inactive")
    .attr("id", "segment-active")
    .find("span")
    .attr("class", "material-icons");

  $(".material-select-menu").click(function () {
    var isMenuClick = $(this).attr("id");
    if (isMenuClick) {
      $("#" + isMenuClick)
        .find("ul")
        .css("display", "block");
    }
  });
});
