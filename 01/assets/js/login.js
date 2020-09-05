$(function () {

  // 登录注册的切换
  $('.login-box').on('click', '#link_reg', function () {
    $('.login-box').hide().siblings('.reg-box').show();
  });
  $('.reg-box').on('click', '#link_login', function () {
    $('.reg-box').hide().siblings('.login-box').show();
  });


  var form = layui.form;
  var layer = layui.layer;
  // 自定义校验规则
  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
          return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
          return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
          return '用户名不能全为数字';
        }
      }

      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      ,
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repassword: function (val) {
      var pwd = $('#form_reg [name="password"]').val();
      if (pwd !== val) {
        return '两次密码不一致！'
      }
    }
  });


  // 发起注册用户的Ajax请求
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name="username"]').val(),
      password: $('#form_reg [name="password"]').val()
    };
    $.post("/api/reguser",
      data,
      function (res) {
        console.log(res); //{status: 0, message: "注册成功！"}
        if (res.status !== 0) {
          return layer.msg(res.message, {
            icon: 6
          });
        }
        layer.msg('注册成功，请登录！', {
          icon: 6
        });
        $('#link_login').click()
      }
    );
  })

  // 发起登录的Ajax请求
  $('#form-login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message, {
            icon: 6
          });
        }
        layer.msg('登录成功！', {
          icon: 6
        });
        // 保存token
        localStorage.setItem('token', res.token);
        location.href = 'index.html';
      }
    });
  })




})