"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 复春堂
 * @联系 
 * @邮箱 
 ***************************************
 **/


/**
 **********************
 * 扩展jQuery的常用方法
 **********************
 **/
(function($){
	$.extend({

		//弹出提示框2秒
		alerts:function(txt,cls){
			var cls = cls?cls:cls='';
			var _html = '<p class="alerts '+cls+'">'+txt+'</p>';
			$('body').append(_html);
			var _as = $('.alerts');
			_as.fadeIn(100);
			setTimeout(function(){
				_as.remove();
			},2000);
		},

		//确定提示框-模拟alert();只是一个提示不做其它用途
		alert:function(txt){
			var tipHtml = '<div class="alertTip_bg">'+
					'<div class="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button>确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			//可拖动
			alertDrag();
			//点确定消失
			$body.append(tipHtml).delegate('.alertTip > button', 'click', function() {
				$(this).parents('.alertTip_bg').remove();
			});
		},

		//弹出确认框-模拟confirm();
		confirm:function(txt){
			var tipHtml = '<div class="alertTip_bg">'+
					'<div class="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button class="cancle">取消</button><button class="sure">确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			$body.append(tipHtml);
			//可拖动
			alertDrag();
			//点cancle消失
			$body.delegate('.alertTip > .cancle', 'click', function() {
				$(this).parents('.alertTip_bg').remove();
			});
		},


		//n-m之间的随机数（默认0-10，包括n和m）
		rdm:function(n,m){
			n = n || 0;
			m = m || 10;
			return parseInt(Math.random()*((m-n)+1))+n;
		},

		//补零函数--返回的是String
		toDbl:function(n){
			return n<10?'0'+n:''+n;
		}
	});
})(jQuery);

//弹出框可推拽函数
function alertDrag(){
	$('body').delegate('.alertTip h6','mousedown',function(e){
		var $box = $(this).parent('.alertTip');
		var o = $box.offset();
		var x = e.pageX - o.left;
		var y = e.pageY - o.top;
		//防止超出屏幕
		var iBoxWidth = $box.width();
		var iBoxHeight = $box.height();
		var iWinWidth = $(window).width();
		var iWinHeight = $(window).height();
		var iMarL = Math.abs(parseInt($box.css("marginLeft")));
		var iMarT = Math.abs(parseInt($box.css("marginTop")));
		var scroll_h = $(window).scrollTop(); //注意有滚动高度

		$(document).bind('mousemove',function(ev){
			$box.stop();
			var _x = ev.pageX - x;
			var _y = ev.pageY - y - scroll_h;
			//防止超出屏幕的判断
			if(_x<0){_x=0}
			if(_x>iWinWidth-iBoxWidth){_x=iWinWidth-iBoxWidth}
			if(_y<0){_y=0}
			if(_y>iWinHeight-iBoxHeight){_y=iWinHeight-iBoxHeight}

			$box.animate({left:_x+iMarL+'px',top:_y+iMarT+'px'},0);
			return false;//防止出现选择文字的情况
		});
		$(document).mouseup(function(){
			$(this).unbind('mousemove');
		});
	});
};





var ski = {
	dom:{
		//use jquery-1.12.3.min.js
	},
	cmn:{
		//common function
	},
	ind:{
		//individual function
	}
};

ski.cmn = {
	//banner图随机切换
	bannerRandom:function(){
		var _i = $.rdm(1,3);
		$('#bannerImg').attr('src','images/banner_0'+_i+'.jpg');
	},
	//goTop
	goTop:function(){
		var $obj = $('#goTop');
		$obj.click(function() {
			$('body,html').animate({scrollTop:0},500);  
            return false;
		});
	},
	//goTop show concats
	topConcats:function(){
		var btnQQ = $('#goQq');
		var imgQQ = $('.go_qq_img');
		btnQQ.hover(function(){
			imgQQ.show();
		},function(){
			imgQQ.hide();
		});

		var btnWx = $('#goWx');
		var imgWx = $('.go_wx_img');
		btnWx.hover(function(){
			imgWx.show();
		},function(){
			imgWx.hide();
		});
	},
	//detail page show concats
	showConcats:function(){
		var $forWx = $('#forWx');
		var $dealWx = $('#dealWx');
		fnConcat($forWx,$dealWx);

		var $forQq = $('#forQq');
		var $dealQq = $('#dealQq');
		fnConcat($forQq,$dealQq);
		
		function fnConcat(btn,box){
			btn.hover(function(){
				box.show();
			},function(){
				box.hide();
			});
		};
	},
	//img scroll load
	imgScrollLoad:function(){
		$("#proDetailImgs img[_src]").each(function(){
			var t = $(this);
			if( t.offset().top<= $(document).scrollTop() + $(window).height() )
			{
				t.attr( "src",t.attr("_src") ).removeAttr("_src");
			}
		});
	},
	mobileNavSlide:function(){
		var $Btn = $('#mNav'), $mModal = $('#mModal'), $mNavSlide = $('#mNavSlide');
		$Btn.click(function(){
			$mModal.show();
			$mNavSlide.show().animate({"right":"0"}, 300)
		});
		$mModal.click(function(e){
			$(this).hide().find('#mNavSlide').hide().animate({"right":"-120px"}, 30);
			e.stopPropagation();
		})
	}
};


/*****
*
*	公共部分执行
*
******/

//banner图随机切换
//ski.cmn.bannerRandom();
//goTop
ski.cmn.goTop();
//goTop show concats
ski.cmn.topConcats();
//detail page show concats
ski.cmn.showConcats();
//detail page show concats
ski.cmn.showConcats();
//detail page img scroll load
ski.cmn.imgScrollLoad();
//nav slide for mobile
ski.cmn.mobileNavSlide();
