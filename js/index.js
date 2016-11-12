jQuery.noConflict();
jQuery(function() {
    //轮播图切换效果
    var index = 0,turn,imgCount = jQuery('.py_lunbo_container').children("a").length;
    jQuery(".points").html("");
    var divStr = "";
    for(var i = 0; i < imgCount; i++){
        divStr += "<div></div>";
    };
    jQuery(".points").html(divStr);
    jQuery(".points>div").eq(0).addClass("current_pointer");
    var lunbo = function() {
        turn = setTimeout(function() {
            jQuery('.py_lunbo_container').animate({
                'left': '-' + ((index + 1) % imgCount) * 960 + 'px'
            }, 500, lunbo);
            index = (index + 1) % imgCount;
            jQuery(".current_pointer").removeClass("current_pointer");
            jQuery(".points>div").eq(index).addClass("current_pointer");
        }, 8000);
    }
    lunbo();

    jQuery('.py_lunbo').hover(function() {
        jQuery('.prev').show();
        jQuery('.next').show();
    }, function() {
        jQuery('.prev').hide();
        jQuery('.next').hide();
    });

    jQuery('.prev').click(function(event) {
        clearInterval(turn);
        jQuery('.py_lunbo_container').stop(true).animate({
            'left': '-' + ((index + imgCount - 1) % imgCount) * 960 + 'px'
        }, 500, lunbo);
        index = (index + imgCount - 1) % imgCount;
        jQuery(".current_pointer").removeClass("current_pointer");
        jQuery(".points>div").eq(index).addClass("current_pointer");
    });
    jQuery('.next').click(function(event) {
        clearInterval(turn);
        jQuery('.py_lunbo_container').stop(true).animate({
            'left': '-' + ((index + 1) % imgCount) * 960 + 'px'
        }, 500, lunbo);
        index = (index + 1) % imgCount;
        jQuery(".current_pointer").removeClass("current_pointer");
        jQuery(".points>div").eq(index).addClass("current_pointer");
    });
    jQuery(".points>div").on("click", function(){
        var num = jQuery(".points>div").index(jQuery(this));
        clearInterval(turn);
        jQuery('.py_lunbo_container').stop(true).animate({
            'left': '-' + num * 960 + 'px'
        }, 500, lunbo);
        index = num;
        jQuery(".current_pointer").removeClass("current_pointer");
        jQuery(".points>div").eq(index).addClass("current_pointer");
    });
/*
    //右下角悬浮
    function rt() {
        var width = jQuery("body").eq(0).width();
        if (width <= 960 + 74) {
            jQuery(".to_top").css("right", "0px")
        } else {
            jQuery(".to_top").css("right", (width - 960 - 94) / 2 + "px");
        }
    }
    rt();

    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() >= 600) {
            jQuery(".to_top").show();
        } else {
            jQuery(".to_top").hide();
        }
    });
*/
    jQuery(".article_info_right_2").hover(function() {
        jQuery(this).children(".share_notice").show();
    }, function() {
        jQuery(this).children(".share_notice").hide();
    });
    jQuery(".share_weixin").on("click", weiXinShare);
    jQuery(".share_sina").on("click", ["sina"], shareweibo);
    jQuery(".share_tencent").on("click", sharetoqqzone);
    jQuery(".share_to_weixin a").click(function(event) {
        event.preventDefault();
        jQuery(".share_to_weixin").hide();
    });
    jQuery(document).on("click",function(event){
        var target = jQuery(event.target);
        if (target.hasClass("share_to_weixin")) {
            jQuery(".share_to_weixin").hide();
        };
    })
        // 分享到微信
    function weiXinShare() {
        var _this = jQuery(this);
        var link = _this.parents(".article").children("h3").children("a").eq(0).attr("href");
        link = link.split("?")[0];
        jQuery('#qrcode').html("").qrcode({
            render: "table",
            width: 194,
            height: 194,
            text: link
        });
        jQuery(".share_to_weixin").show();
    }

    //分享到微博
    function shareweibo(event) {
        var type = event.data[0];
        var title = '';
        var rLink = '';
        var site = 'http://www.miui.com/forum.php';
        var pic = '';
        var _this = jQuery(this);
    	title = jQuery.trim(_this.parents(".article").children("h3").eq(0).text()) + "。" + jQuery.trim(_this.parents(".article").children("p").eq(0).text());
    	rLink = _this.parents(".article").children("h3").children("a").eq(0).attr("href");
    	pic = _this.parents(".article").children("a").children("img").eq(0).attr("src");
        if (type == "sina") {
            window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(rLink) + '&appkey=' + encodeURIComponent(site) + '&pic=' + encodeURIComponent(pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
        } else if (type == "qq") {
            window.open('http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(rLink) + '&appkey=801188627' + encodeURIComponent(site) + '&pic=' + encodeURIComponent(pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
        }
    }

    //分享到QQ空间
    function sharetoqqzone() {
    	var _this = jQuery(this),title,url,picurl;
    	title = jQuery.trim(_this.parents(".article").children("h3").eq(0).text());
    	url = _this.parents(".article").children("h3").children("a").eq(0).attr("href");
    	picurl = _this.parents(".article").children("a").children("img").eq(0).attr("src");
        var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
        window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
    }

})
