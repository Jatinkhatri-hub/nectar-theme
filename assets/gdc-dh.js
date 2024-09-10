$(document).ready(function(){

  $('.custom_btn-starterpack').on('click',function(e){
    e.preventDefault();
    console.log('custom product card starter pack atc');
    var thisForm = $(this).closest('form');
    var thisVariantId = parseInt(thisForm.find('#product-variant-id-holder').attr('value'));
    console.log({thisVariantId});
    var starterPackSellingPlanId = 966688827;
    addItemToCart(thisVariantId, 1, starterPackSellingPlanId);
  });

  $('.subscribe-and-save-collection').on('click',function(e){
    e.preventDefault();
    console.log($(this));
    var form = $(this).closest('form');
    var variantIdElement = form.find('#product-variant-id-holder');
    var selectedVariantId = variantIdElement.val();
    var sellingPlanId = form.find('input[name="selling_plan"]').val();
    
    console.log({selectedVariantId}, {sellingPlanId});
    addItemToCart(selectedVariantId, 1, sellingPlanId);
  });

  function addItemToCart(variant_id, qty, selling_plan) {
    data = {
      "id": variant_id,
      "quantity": qty,
      "selling_plan": selling_plan
    }
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function(data) {
        console.log({data});
      }
    });
  }

  $('[data-card-purchase-option]').on('click',function(){
    var radioVal = $(this).val();
    var parentWrapper = $(this).closest('.product-form__controls-group');
    var oneTimeATC = parentWrapper.find('[data-add-to-cart-one-time]');
    var subscribeATC = parentWrapper.find('[data-add-to-cart-subscribe]');
    console.log( {radioVal} );
    if ( radioVal == "subsavecard" ) {
      oneTimeATC.addClass('hidden');
      subscribeATC.removeClass('hidden');
    } else {
      oneTimeATC.removeClass('hidden');
      subscribeATC.addClass('hidden');
    }
  });
});