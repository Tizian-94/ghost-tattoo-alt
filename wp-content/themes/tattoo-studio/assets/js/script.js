/* ===============================================
  OPEN CLOSE Menu
============================================= */

function tattoo_studio_open_menu() {
  jQuery('button.menu-toggle').addClass('close-panal');
  setTimeout(function(){
    jQuery('nav#main-menu').show();
  }, 100);

  return false;
}
jQuery( "button.menu-toggle").on("click", tattoo_studio_open_menu);

function tattoo_studio_close_menu() {
  jQuery('button.close-menu').removeClass('close-panal');
  jQuery('nav#main-menu').hide();
}

jQuery( "button.close-menu").on("click", tattoo_studio_close_menu);

function tattoo_studio_search_show() {
	jQuery(".outer-search").addClass('show');
	jQuery(".outer-search").fadeIn();
}
jQuery( ".search-cont-button").on("click", tattoo_studio_search_show);

function tattoo_studio_search_hide() {
	jQuery(".outer-search").removeClass('show');
	jQuery(".outer-search").fadeOut();
}
jQuery( ".search-cont-button-close").on("click", tattoo_studio_search_hide);

/* ===============================================
  TRAP TAB FOCUS ON MODAL MENU
============================================= */

jQuery('button.close-menu').on('keydown', function (e) {
  if (jQuery("this:focus") && (e.which === 9)) {
    e.preventDefault();
    jQuery(this).blur();
    jQuery('#main-menu ul:first li:first a').focus();
  }
});

jQuery('button.close-menu').on('keydown', function (event) {
  if (event.shiftKey && event.keyCode == 9) {
    event.preventDefault();
    jQuery(this).blur();
    jQuery('#main-menu ul:last li:last a').focus();
  }
})

jQuery('#main-menu ul:first li:first a').on('keydown', function (event) {
  if (event.shiftKey && event.keyCode == 9) {
    event.preventDefault();
    jQuery(this).blur();
    jQuery('button.close-menu').focus();
  }
})

jQuery(document).ready(function() {
  window.addEventListener('load', (event) => {
      jQuery(".loader").delay(2000).fadeOut("slow");
  });
})
/* ===============================================
  Scroll Top //
============================================= */

jQuery(window).scroll(function () {
  if (jQuery(this).scrollTop() > 100) {
      jQuery('.scroll-up').fadeIn();
  } else {
      jQuery('.scroll-up').fadeOut();
  }
});

jQuery('a[href="#tobottom"]').click(function () {
  jQuery('html, body').animate({scrollTop: 0}, 'slow');
  return false;
});

(function( $ ) {
  $(window).scroll(function(){
      var sticky = $('.sticky-header'),
      scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass('fixed-header');
      else sticky.removeClass('fixed-header');
    });
  })( jQuery );

/* ===============================================
  Search pop up
============================================= */

jQuery('.search-cont-button-close').on('keydown', function (es) {
  if (jQuery("this:focus") && (es.which === 9)) {
    es.preventDefault();
    jQuery(this).blur();
    jQuery('.inner-search form input').focus();
  }
});

jQuery('.inner-search form input').on('keydown', function (eventser) {
  if (eventser.shiftKey && eventser.keyCode == 9) {
    eventser.preventDefault();
    jQuery(this).blur();
    jQuery('.search-cont-button-close').focus()
  }
});

/* ===============================================
  banner Heading
============================================= */

if (document.querySelector(".bdt-prime-slider")) {
  const tattoo_studio_headings = document.querySelectorAll(".tattoo-studio-banner-section .bdt-title-tag");

  tattoo_studio_headings.forEach(tattoo_studio_heading => {
      // Split the heading text by each sentence and trim extra spaces
      const parts = tattoo_studio_heading.textContent.trim().split(" ").reduce((acc, word) => {
          if (acc[acc.length - 1].length + word.length + 1 <= 15) {
              acc[acc.length - 1] += (acc[acc.length - 1] ? " " : "") + word;
          } else {
              acc.push(word);
          }
          return acc;
      }, [""]);

      // Clear the original text content
      tattoo_studio_heading.textContent = "";

      // Wrap each part in a span and append it to the heading
      parts.forEach((part) => {
          const span = document.createElement("span");
          span.textContent = part;
          tattoo_studio_heading.appendChild(span);
      });
  });
}

/* ===============================================
  Custom Cursor
============================================= */

const tattoo_studio_customCursor = {
  init: function () {
    this.tattoo_studio_customCursor();
  },
  isVariableDefined: function (el) {
    return typeof el !== "undefined" && el !== null;
  },
  select: function (selectors) {
    return document.querySelector(selectors);
  },
  selectAll: function (selectors) {
    return document.querySelectorAll(selectors);
  },
  tattoo_studio_customCursor: function () {
    const tattoo_studio_cursorDot = this.select(".cursor-point");
    const tattoo_studio_cursorOutline = this.select(".cursor-point-outline");
    if (this.isVariableDefined(tattoo_studio_cursorDot) && this.isVariableDefined(tattoo_studio_cursorOutline)) {
      const cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: window.innerWidth / 2,
        endY: window.innerHeight / 2,
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: tattoo_studio_cursorDot,
        $outline: tattoo_studio_cursorOutline,

        init: function () {
          this.dotSize = this.$dot.offsetWidth;
          this.outlineSize = this.$outline.offsetWidth;
          this.setupEventListeners();
          this.animateDotOutline();
        },

        updateCursor: function (e) {
          this.cursorVisible = true;
          this.toggleCursorVisibility();
          this.endX = e.clientX;
          this.endY = e.clientY;
          this.$dot.style.top = `${this.endY}px`;
          this.$dot.style.left = `${this.endX}px`;
        },

        setupEventListeners: function () {
          window.addEventListener("load", () => {
            this.cursorEnlarged = false;
            this.toggleCursorSize();
          });

          tattoo_studio_customCursor.selectAll("a, button").forEach((el) => {
            el.addEventListener("mouseover", () => {
              this.cursorEnlarged = true;
              this.toggleCursorSize();
            });
            el.addEventListener("mouseout", () => {
              this.cursorEnlarged = false;
              this.toggleCursorSize();
            });
          });

          document.addEventListener("mousedown", () => {
            this.cursorEnlarged = true;
            this.toggleCursorSize();
          });
          document.addEventListener("mouseup", () => {
            this.cursorEnlarged = false;
            this.toggleCursorSize();
          });

          document.addEventListener("mousemove", (e) => {
            this.updateCursor(e);
          });

          document.addEventListener("mouseenter", () => {
            this.cursorVisible = true;
            this.toggleCursorVisibility();
            this.$dot.style.opacity = 1;
            this.$outline.style.opacity = 1;
          });

          document.addEventListener("mouseleave", () => {
            this.cursorVisible = false;
            this.toggleCursorVisibility();
            this.$dot.style.opacity = 0;
            this.$outline.style.opacity = 0;
          });
        },

        animateDotOutline: function () {
          this._x += (this.endX - this._x) / this.delay;
          this._y += (this.endY - this._y) / this.delay;
          this.$outline.style.top = `${this._y}px`;
          this.$outline.style.left = `${this._x}px`;

          requestAnimationFrame(this.animateDotOutline.bind(this));
        },

        toggleCursorSize: function () {
          if (this.cursorEnlarged) {
            this.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
            this.$outline.style.transform = "translate(-50%, -50%) scale(1.6)";
          } else {
            this.$dot.style.transform = "translate(-50%, -50%) scale(1)";
            this.$outline.style.transform = "translate(-50%, -50%) scale(1)";
          }
        },

        toggleCursorVisibility: function () {
          if (this.cursorVisible) {
            this.$dot.style.opacity = 1;
            this.$outline.style.opacity = 1;
          } else {
            this.$dot.style.opacity = 0;
            this.$outline.style.opacity = 0;
          }
        },
      };
      cursor.init();
    }
  },
};
tattoo_studio_customCursor.init();

/* ===============================================
  Progress Bar
============================================= */
const tattoo_studio_progressBar = {
  init: function () {
      let tattoo_studio_progressBarDiv = document.getElementById("elemento-progress-bar");

      if (tattoo_studio_progressBarDiv) {
          let tattoo_studio_body = document.body;
          let tattoo_studio_rootElement = document.documentElement;

          window.addEventListener("scroll", function (event) {
              let tattoo_studio_winScroll = tattoo_studio_body.scrollTop || tattoo_studio_rootElement.scrollTop;
              let tattoo_studio_height =
              tattoo_studio_rootElement.scrollHeight - tattoo_studio_rootElement.clientHeight;
              let tattoo_studio_scrolled = (tattoo_studio_winScroll / tattoo_studio_height) * 100;
              tattoo_studio_progressBarDiv.style.width = tattoo_studio_scrolled + "%";
          });
      }
  },
};
tattoo_studio_progressBar.init();