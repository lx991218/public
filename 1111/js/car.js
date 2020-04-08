$(function() {
	//全选全不选功能模块
	// 就是把全选按钮(checkall)的状态赋值给  三个小的按钮(j-checkbox)就可以了
	$('.checkall').change(function() {
		// $(this).prop('checked');
		$('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
		if($(this).prop('checked')){
			$('.cart-item').addClass('check-cart-item');
		} else {
			$('.cart-item').removeClass('check-cart-item');
		}
	});
	$('.j-checkbox').change(function() {
		if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
			$('.checkall').prop('checked', true);
		} else {
			$('.checkall').prop('checked', false);
		}
		if($(this).prop('checked')){
			$(this).parents('.cart-item').addClass('check-cart-item');
		} else {
			$(this).parents('.cart-item').removeClass('check-cart-item');
		}
	});
	// 增减商品数量模块
	$('.increment').click(function() {
		var n = $(this).siblings('.itxt').val();
		n++;
		$(this).siblings('.itxt').val(n);
		// 商品小计模块
		var p = $(this).parents('.p-num').siblings('.p-price').html();
		p = p.substr(1);
		var price = (p *n).toFixed(2);
		var p = $(this).parents('.p-num').siblings('.p-sum').html('¥' + price);
		getSum();
	})
	$('.decrement').click(function() {
		var n = $(this).siblings('.itxt').val();
		if (n == 1) {
			return false;
		}
		n--;
		$(this).siblings('.itxt').val(n);
		var p = $(this).parents('.p-num').siblings('.p-price').html();
		p = p.substr(1);
		var price = (p *n).toFixed(2);
		var p = $(this).parents('.p-num').siblings('.p-sum').html('¥' + price);
		getSum();
	})
	//用户修改文本框的值 计算 小计模块
	$('.itxt').change(function() {
		var n = $(this).val();
		var p = $(this).parents('.p-num').siblings('.p-price').html();
		p = p.substr(1);
		var price = (p *n).toFixed(2);
		var p = $(this).parents('.p-num').siblings('.p-sum').html('¥' + price);
		getSum();
	})
	//计算总计和总额模块
	getSum();
	function getSum() {
		var count = 0; //计算总件数
		var money = 0;//计算总额
		$('.itxt').each(function(i,ele){
			count += parseInt($(ele).val());
		});
		$('.amount-sum em').text(count);
		$('.p-sum').each(function(i,ele){
			money += parseFloat($(ele).text().substr(1));
		})
		$('.price-sum em').text('¥'+money.toFixed(2));
	}
	//删除商品模块
	$('.p-action a').click(function(){
		$(this).parents('.cart-item').remove();
		getSum();
	})
	$('.remove-batch').click(function(){
		$('.j-checkbox:checked').parents('.cart-item').remove();
		getSum();
	})
	$('.clear-all').click(function(){
		$('.cart-item').remove();
		getSum();
	})
})
