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
      var e = $(".product_swatches_row1 .option-selector.active").attr("data-value") + "-" + $(".product-flavor_dropdown1 li.active").attr("data-option");
      $(t)
          .closest("form")
          .find(".product-variant-select-a li[data-value='" + e + "']")
          .trigger("click"),
          $(".description").hide(),
          
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
              
          var i = $(this).attr("data-image1");
              $(".product-img1").length > 0
                  ? $(".product-img1").attr("src", i)
                  : ($(this).closest(".product-card").find(".grid-view-item__image").attr("src", i), $(this).closest(".product-card").find(".grid-view-item__image").attr("srcset", i));
      }),
      $(".product-flavor_dropdown1").click(function (t) {
          $(this).find("ul").toggleClass("active");
      }),
      $(".product-flavor_dropdown1 li").click(function (t) {
          $(this).hasClass("active") || ($(".product-flavor_dropdown1 li").removeClass("active"), $(this).addClass("active"), console.log($(this).attr("data-option")), a($(this)));
      }),
      $(".product_swatches_row1 .option-selector").click(function (t) {
          $(".product_swatches_row1 .option-selector").removeClass("active"), $(this).addClass("active"), a($(this));
                  var desc = $(".product-description1").html();
          if (desc === "Daily Electrolyte Drink Mix") {
            $(".product-description1").html("Electrolytes + 75mg Organic Caffeine + L-Theanine + B12");
          } else {
            $(".product-description1").html("Daily Electrolyte Drink Mix");
          }
      }),
      a();
});