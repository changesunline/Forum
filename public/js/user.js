// 浏览器端使用AMD模块化，配置require.js插件
(function() {
    require.config({
        // baseUrl: 'js/lib'
        paths: {
            jquery: '../../node_modules/jquery/dist/jquery',
            common: './common',
            user: './user'
        }
    })
    require(['jquery','common'], function($,common) {

        // 登陆功能
        common.ajaxPost('#login_form', '/login', function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.location.href = '/'
                return
            }
            window.alert(data.message)
        })

        // 注册功能
        common.ajaxPost('#register_form', '/register', function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.alert(data.message)
                window.location.href = '/'
                return
            } 
            window.alert(data.message)
        })

        // 修改基本信息
        common.ajaxPost('#form-profile', '/settings/profile', function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.alert(data.message)
                window.location.href = '/settings/profile'
                return
            } 
            window.alert(data.message)
        })

        // 修改密码
        common.ajaxPost('#form-admin', '/settings/admin', function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.alert(data.message)
                window.location.href = '/settings/profile'
                return
            }
            window.alert(data.message)
        })

        // 注销账号
        $('#delete-btn').on('click', function(e) {
            e.preventDefault()
            $.ajax({
                url: '/settings/delete',
                type: 'get',
                data: '',
                dataType: 'jsonp',
                success: function(data) {
                    var err_code = data.err_code
                    if (err_code === 0) {
                        // 服务端重定向针对异步请求无效
                        window.alert(data.message)
                        window.location.href = '/'
                        return
                    }
                    window.alert(data.message)
                }
            })
        })

        // 修改头像并上传
        function previewFile() {
            var preview = document.querySelector('#avatar')
            var file = document.querySelector('input[type=file]').files[0]
            var reader = new FileReader()

            reader.addEventListener("load", function() {
                preview.src = reader.result
            }, false)

            if (file) {
                reader.readAsDataURL(file)
            }
        }
    })
})()