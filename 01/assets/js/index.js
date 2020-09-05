$(function () {
    // 获取用户基本信息
    getUserInfo()


    var layer = layui.layer;

    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                renderAvatar(res.data);
            }
        });
    }

    // 渲染用户头像和名称
    function renderAvatar(val) {
        // 获取用户的名称
        var username = val.nickname || val.username;
        // 设置欢迎的文本，找到关键元素进行设置
        $('#welcome').html('欢迎&nbsp;&nbsp;' + username);
        if (val.user_pic != null) {
            $('.layui-nav-img').attr('src', val.user_pic).show();
            $('.text-avatar').hide();

        } else {
            $('.layui-nav-img').hide();
            var first = username[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }

    }

    // 实现退出功能
    $('#btnLogout').on('click', function () {

        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 移除本地缓存的 token，并且跳转到登录页面
            localStorage.removeItem('token');
            location.href='login.html'

            layer.close(index);
          });

    })




})