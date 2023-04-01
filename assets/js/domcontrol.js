window.onpageshow = function () {
  // 页面指示
  try {
    const currentPage = window.location.pathname;
    const activatedSegment = document.querySelector(`a[href="${currentPage}"]`);
    const inactiveSegment = activatedSegment.querySelector("#segment-inactive");
    inactiveSegment.id = "segment-active";
  } catch (error) {
    document.querySelector(`a[href="/posts"] #segment-inactive`).id = "segment-active";
  }

  // 滚动到页面顶部
  const scrollTopElDesktop = document.querySelector("#rcf-mfb-topbutton");
  const scrollTopElMobile = document.querySelector("#mtb-dc-area");

  function scrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  /// 桌面端
  scrollTopElDesktop.addEventListener("click", () => {
    scrollToTop();
  });

  /// 移动端
  var lastTouchEnd = 0;
  scrollTopElMobile.addEventListener(
    "touchend",
    (e) => {
      var now = new Date().getTime();

      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
        scrollToTop();
      }
      lastTouchEnd = now;
    },
    false
  );

  // 涟漪效果
  const rippleElements = document.querySelectorAll(
    ".mnd a, .mib, .mcd-header > span, .menu-and-fab span, .mcd a, #accent, button, .mbt, .mfb, .mcp, .mcd[spec='focus'], .mtb span, input[type='checkbox'], input[type='radio']"
  );

  rippleElements.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const d = Math.max(btn.clientWidth, btn.clientHeight);

      btn.classList.add("ripple-effect");
      btn.style.setProperty("--x", x);
      btn.style.setProperty("--y", y);
      btn.style.setProperty("--d", d);
    });
    btn.addEventListener("animationend", () => {
      btn.classList.remove("ripple-effect");
    });
  });

  // 滚动事件
  window.onscroll = function () {
    const header = document.querySelector("#content-header");
    const scrollY = window.scrollY;
    const topAppBar = document.querySelector(".mtb");
    const topButton = document.querySelector("#rcf-mfb-topbutton");

    topAppBar.setAttribute("scroll", scrollY >= 64 ? "true" : "false");

    header.style.opacity = scrollY >= 400 ? "0" : "1";
    topButton.style.cssText = `
      opacity: ${scrollY >= 400 ? "1" : "0"};
      visibility: ${scrollY >= 400 ? "visible" : "hidden"};
      animation: ${scrollY >= 400 ? "popOut 0.6s cubic-bezier(0.4, 1, 0.6, 0.6)" : ""}
    `;
  };

  // 缩放事件
  window.onresize = function () {
    const navBar = document.querySelector(".mnb");
    const navRail = document.querySelector(".mnr");

    changeHeaderTransfrom();

    try {
      if (window.innerWidth > 768) {
        navBar.classList.replace("mnb", "mnr");
      } else {
        navRail.classList.replace("mnr", "mnb");
      }
    } catch (err) {
      return null;
    }
  };

  // 侧边栏
  const mndSection = document.querySelector(".mnd");
  const mndEntries = mndSection.querySelectorAll(".mnd-entry");
  const mnbMenuBtn = document.querySelectorAll(".menu-and-fab > .mib, .mtb > #mtb-mib-menu");

  mnbMenuBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      mndSection.toggleAttribute("show");
    });
  });

  mndEntries.forEach((item) => {
    item.addEventListener("click", () => {
      mndSection.toggleAttribute("show", false);
    });
  });

  document.addEventListener("click", (e) => {
    const isMnd = e.target.closest(".mnd");
    const isMtb = e.target.closest(".mtb");
    const isMAB = e.target.closest(".menu-and-fab");

    if (!isMnd && (window.matchMedia("(max-width: 768px)").matches ? !isMtb : !isMAB)) {
      mndSection.toggleAttribute("show", false);
    }
  });
};

window.onload = function () {
  removeLoadScreen();
  changeHeaderTransfrom();
};

function changeHeaderTransfrom() {
  const isImageSource = document.querySelector("#header_image");
  const isImageOffset = isImageSource.offsetHeight;

  isImageSource.style.setProperty("--via-transfrom-header-image", isImageOffset - 484);
}

function removeLoadScreen() {
  const splashScreen = document.querySelector(".content-loading");
  const mainContent = document.querySelector(".content-grid");

  splashScreen.style.animation = "fadeOut 0.4s forwards";

  splashScreen.addEventListener("animationend", () => {
    splashScreen.style.display = "none";
    mainContent.style.overflow = "initial";
  });
}
