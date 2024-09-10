jQuery(document).ready(function () {
  var t = new Swiper(".gallery-top.start_1", { spaceBetween: 0, loop: !0, loopedSlides: 5, allowTouchMove: 1, simulateTouch: !1, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, initialSlide: 1 }),
      e = new Swiper(".gallery-top.start_2", { spaceBetween: 0, loop: !0, loopedSlides: 5, allowTouchMove: 1, simulateTouch: !1, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, initialSlide: 2 }),
      i = new Swiper(".gallery-top.start_3", { spaceBetween: 0, loop: !0, loopedSlides: 5, allowTouchMove: 1, simulateTouch: !1, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, initialSlide: 3 }),
      o = new Swiper("#product_single_main .swiper-container1", {
          simulateTouch: !0,
          autoHeight: !0,
          pagination: { el: ".swiper-pagination", type: "bullets" },
          navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      });
  function a(t = "body") {
      var e = $(".product_swatches_row .option-selector.active").attr("data-value") + "-" + $(".product-flavor_dropdown li.active").attr("data-option");
      $(t)
          .closest("form")
          .find(".product-variant-select-a li[data-value='" + e + "']")
          .trigger("click"),
          $(".description").hide(),
          console.log("CCCCC"),
          console.log($(".product-variant-select-a li[data-value='" + e + "']").attr("id")),
          $(
              ".description[data-variantid='" +
                  $(t)
                      .closest("form")
                      .find(".product-variant-select-a li[data-value='" + e + "']")
                      .attr("id") +
                  "'"
          ).show();
  }
  $(".product-variant-select-drop-toggle").on("click", function () {
      $(this).closest(".product-variant-select-a").find(".product-variant-select-ul").find("ul").toggleClass("active");
  }),
      $(".product-variant-select-a").on("click", ".product-variant-select-drop-toggle, .product-variant-select-ul", function (t) {
          $(t.target);
          $(this).find("ul").toggleClass("active");
      }),
      $(".product-variant-select-a li").click(function () {
          var t = $(this).attr("id"),
              e = $(this).data("img-slide");
          $(this).closest("form").find("#product-variant-id-holder").val(t),
              $(this).closest(".product-variant-select-a").find("li").removeClass("active"),
              $(this).addClass("active"),
              $(".slider-wrap-container").removeClass("active"),
              $("#" + e).addClass("active"),
              $.each(o, function (t, e) {
                  $.isFunction(o[t].slideTo) && o[t].slideTo(0);
              });

          document.querySelectorAll('[name=id]').forEach(el =>
              el.dispatchEvent(new Event('change')));

          var i = $(this).attr("data-image");
          //console.log(i),
              $(".product-img").length > 0
                  ? $(".product-img").attr("src", i)
                  : ($(this).closest(".product-card").find(".grid-view-item__image").attr("src", i), $(this).closest(".product-card").find(".grid-view-item__image").attr("srcset", i));
      }),
      $(".product-flavor_dropdown").click(function (t) {
          $(this).find("ul").toggleClass("active");
      }),
      $(".product-flavor_dropdown li").click(function (t) {
          $(this).hasClass("active") || ($(".product-flavor_dropdown li").removeClass("active"), $(this).addClass("active"), console.log($(this).attr("data-option")), a($(this)));
      }),
      $(".product_swatches_row .option-selector").click(function (t) {
          $(".product_swatches_row .option-selector").removeClass("active"), $(this).addClass("active"), a($(this));
      }),
      a(),
      t.on("slideChangeTransitionStart", function (t) {
          var e = $(".swiper-slide-active").data("slide-count");
          $(".slide-text").removeClass("active"), $(".slide-text-" + e).addClass("active");
      }),
      $(".gallery-top").click(function () {
          $(this).hasClass("start_2") ? (t.slideNext(), e.slideNext(), i.slideNext()) : $(this).hasClass("start_3") && (t.slidePrev(), e.slidePrev(), i.slidePrev());
      });
  var s = void 0;
  function r() {
      var t = $(window).width();
      t < 768 && null == s
          ? (s = new Swiper(".mirgo_ingredient_grid .section-container .page-width .section-content .section-grid .swiper-container", {
                slidesPerView: "auto",
                spaceBetween: 0,
                pagination: { el: ".swiper-pagination", clickable: !0 },
                breakpoints: { 640: { slidesPerView: "auto" }, 767: { slidesPerView: 2 } },
            }))
          : t > 767 &&
            null != s &&
            (s.destroy(),
            (s = void 0),
            jQuery(".mirgo_ingredient_grid .section-container .page-width .section-content .section-grid .swiper-container .swiper-wrapper").removeAttr("style"),
            jQuery(".mirgo_ingredient_grid .section-container .page-width .section-content .section-grid .swiper-container .swiper-slide").removeAttr("style"));
  }
  r(),
      $(window).on("load resize", function () {
          r();
      }),
      ($.fn.isInViewport = function () {
          let t = $(this).offset().top,
              e = t + $(this).outerHeight(),
              i = $(window).scrollTop(),
              o = i + $(window).height();
          return e > i && t < o;
      });
  if (
      ($(window).scroll(function () {
          var t = $("#shopify-section-header").height();
          $(this).scrollTop() > t ? $("#shopify-section-header").addClass("border-bottom-header") : $("#shopify-section-header").removeClass("border-bottom-header");
      }),
      $(window).scroll(function () {
          var t = $("#shopify-section-free-trial-header").height();
          $(this).scrollTop() > t ? $("#shopify-section-free-trial-header").addClass("border-bottom-header") : $("#shopify-section-free-trial-header").removeClass("border-bottom-header");
      }),
      $(".mirgo-animation-blocks").length > 0)
  ) {
      var n = document.querySelector(".mirgo-animation-blocks .path"),
          c = $(".mirgo-animation-blocks").find("path"),
          l = c.offset().top,
          d = n.getTotalLength();
      (n.style.strokeDasharray = d + " " + d),
          (n.style.strokeDashoffset = d),
          $(window).scroll(function () {
              $(this).height() + $(this).scrollTop() - 200 > l && c.animate({ "stroke-dashoffset": 0 }, 3e3);
          });
  } else console.log("animation block not exist");
  function p(t) {
    console.log({t});
      var e = $(".price-item.price-item--regular").text(),
          i = (e.substr(0, e.indexOf(".")), "$25 Per Month | Start Now");
          console.log({e});
     /* "init" != t && "recharge" != t && (i = "$30 | Start Now"), $(".product-form__cart-submit span").html(i), $(".product-form__cart-submit-orange span").html(i); */
  }
  if (
      ($(".custom-plus").click(function () {
          var t = $(this).parents(".section-collapse-column");
          t.find(".section-collapse-column p").outerHeight();
          $(this).hasClass("active")
              ? ($(this).removeClass("active"), t.removeClass("active"))
              : ($(".custom-plus").removeClass("active"), $(".section-collapse-column").removeClass("active"), $(this).addClass("active"), t.addClass("active"));
      }),
      $(".modal--details").insertAfter("#PageContainer"),
      $(".btn-trigger-modal-ing").click(function () {
          $(".modal--details").addClass("open");
      }),
      $(".close-content").click(function () {
          $(".modal--details").removeClass("open");
      }),
      $(".product-single-header-toggle a").click(function () {
          if ($(this).hasClass("active"));
          else {
              $(".product-single-header-toggle a").removeClass("active"), $(".product-single__description").removeClass("active");
              var t = $(this).data("toggles");
              $(".product-single__description" + t).addClass("active"), $(this).addClass("active");
          }
      }),
      $(document).ready(function () {
          new GoCart();
      }),
      p("init"),
      $(".rc_radio__onetime").click(function () {
          console.log('one time');
          p("onetime");
      }),
      $(".rc_radio__autodeliver").click(function () {
          p("recharge");
      }),
      $(".trigger-submit-form").click(function () {
          $(".js-go-cart-add-to-cart").trigger("click");
      }),
      $("#disable-drawer")[0] ||
          $(document).ajaxComplete(function (t, e, i) {
              new GoCart();
              $(".go-cart__trigger").trigger("click");
          }),
      $(".ajax-recharge-checkout").click(function () {
          jQuery.ajax({
              type: "POST",
              url: "/cart/add.js",
              dataType: "json",
              data: $('form[action="/cart/add"]').serialize(),
              success: function (t) {
                  jQuery.ajax({
                      type: "GET",
                      url: "/cart.js",
                      dataType: "json",
                      success: function (t) {
                        var e = "/cart";
                          window.location = e;
                      },
                  });
              },
          });
      }),
      $(".non-button-recharge").click(function () {
          var t = $(".product-form__variants option:selected").attr("value");
          jQuery.ajax({ type: "POST", url: "/cart/add.js", data: { quantity: 1, id: t }, async: !1, success: function () {} });
      }),
      $(".mirgo-icon-home").length > 0)
  )
      var u = $(".mirgo-icon-home").offset().top;
  var h = u - 100;
  $(window).scroll(function () {
      $(this).scrollTop() >= h
          ? ($(".header-additional-atc").removeClass("hidden"), $("#shopify-section-header").removeClass("height_auto"))
          : ($(".header-additional-atc").addClass("hidden"), $("#shopify-section-header").addClass("height_auto"));
  });
}),
  $(".go-cart__overlay").click(function () {
      $(".go-cart-drawer__close").trigger("click");
  }),
  $(".custom_btn").on("click", function (t) {
      t.preventDefault(), $(this).closest("div").find("button.btn").trigger("click");
  }),
  $(window).load(function () {
      $(".with_subscription").each(function () {
          $(this).html($(this).parent(".product-form__controls-group").find("button.btn").html());
      }),
          $(".description").length > 0 && $(".description:first").show();
  }),
  $(".rc_block").click(function () {
    console.log('clicked');
      $(this).hasClass("trigger") || ($(this).addClass("trigger"), $(this).trigger("click"));
      var t = $(this).closest("form").find("span.hide").text();
      $(this).closest("form").find(".with_subscription").html(t);
  });

  $('body').on('classChanged','.rc-option__subsave',function(){
    console.log('changed');
    });
    
    $('body').on('click','.rc-option__subsave',function(){
        console.log('clicked');
        $('.product-form__cart-submit').addClass('subscription-add-to-cart');
        $('.product-form__cart-submit').removeClass('onetime-add-to-cart');
        $('.header-additional-atc').addClass('header-subscription-add-to-cart');
        $('.header-additional-atc').removeClass('header-onetime-add-to-cart');
    });
    $('body').on('click','.rc-option__onetime',function(){
        console.log('clicked');
        $('.product-form__cart-submit').addClass('onetime-add-to-cart');
        $('.product-form__cart-submit').removeClass('subscription-add-to-cart');
        $('.header-additional-atc').addClass('header-onetime-add-to-cart');
        $('.header-additional-atc').removeClass('header-subscription-add-to-cart');
    });

    var targetNodes = $(".product-form__item .product__price");
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var myObserver = new MutationObserver(mutationHandler);
    var obsConfig = {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true
    };
    
    //--- Add a target node to the observer. Can only add one node at a time.
    if ( $(".product-form__item .product__price").length ) {
        targetNodes.each(function() {
            myObserver.observe(this, obsConfig);
        });
    }
    
    function mutationHandler(mutationRecords) {
    
      //console.info("mutationHandler:");
      //console.log({mutationRecords});
    
      mutationRecords.forEach(function(mutation) {
        console.log({mutation});
        //console.log("Mutation type: ", mutation.type);
    
        if (typeof mutation.removedNodes == "object") {
          //var jq = $(mutation.removedNodes);
          //console.log(jq);
          //console.log(jq.is("span.myclass2"));
          //console.log(jq.find("span"));
        }
      });
      var newPriceContent = mutationRecords[0].target.innerHTML;
      console.log({newPriceContent});
      $('.header-additional-atc .product__price').html(newPriceContent);
    }