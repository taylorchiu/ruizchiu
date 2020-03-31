var ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(el) {
    this.el = el;
    this.speed = parseFloat(this.el.getAttribute('data-parallax-speed'));
    this.maxScroll = parseInt(this.el.getAttribute('data-max-scroll'));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) { return; }
    var offset = -(scrollY * this.speed)/2;
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function(val) {
    this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
    this.el.style.MozTransform    = "translate3d(0, " + val + "px, 0)";
    this.el.style.OTransform      = "translate3d(0, " + val + "px, 0)";
    this.el.style.transform       = "translate3d(0, " + val + "px, 0)";
    this.el.style.msTransform     = "translateY(" + val + "px)";
  };

  return ParallaxPart;

})();

ParallaxManager = (function() {
  ParallaxManager.prototype.parts = [];

  function ParallaxManager(elements) {
    if (Array.isArray(elements) && elements.length) {
      this.elements = elements;
    }
    if (typeof elements === 'object' && elements.item) {
      this.elements = Array.prototype.slice.call(elements);
    } else if (typeof elements === 'string') {
      this.elements = document.querySelectorAll(elements);
      if (this.elements.length === 0) {
        throw new Error("Parallax: No elements found");
      }
      this.elements = Array.prototype.slice.call(this.elements);
    } else {
      throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
    }
    for (var i in this.elements) {
      this.parts.push(new ParallaxPart(this.elements[i]));
    }
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  ParallaxManager.prototype.onScroll = function() {
    window.requestAnimationFrame(this.scrollHandler.bind(this));
  };

  ParallaxManager.prototype.scrollHandler = function() {
    var scrollY = Math.max(window.pageYOffset, 0);
    for (var i in this.parts) { this.parts[i].update(scrollY); }
  };

  return ParallaxManager;

})();

new ParallaxManager('.parallax-layer');


// typed.js thanks to https://github.com/mattboldt/typed.js/  //
$(function(){
  $(".typed").typed({
    strings: ["Educator.", "Engineer.", "Mentor.", "Diversity Advocate.", "Engineering Manager."],
    typeSpeed: 200,
    backSpeed: 200,
    showCursor: false,
    loop: true,
    backDelay: 2000,
  });
});

// show footer on scroll //
$(window).scroll(function(event) {
	function footer(){
    var scroll = $(window).scrollTop();
    if(scroll > 500){  $(".footer").fadeIn("slow").addClass("show-footer");}
    else { $(".footer").fadeOut("slow").removeClass("show-footer");}
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      if ($('.footer-nav').is(':hover')) {
    	footer();}
      else { $(".footer-nav").fadeOut("slow");}
    }, 2000));
  }
  footer();
});
