// 登陆功能
$('#login_form').on('submit', function(e) {
    e.preventDefault()
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        url: '/login',
        type: 'post',
        data: formData,
        dataType: 'jsonp',
        success: function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.alert(data.message)
                window.location.href = '/'
            } else {
                window.alert(data.message)
            }
        }
    })
})

// 注册功能
$('#register_form').on('submit', function(e) {
    e.preventDefault()
    var formData = $(this).serialize()
    $.ajax({
        url: '/register',
        type: 'post',
        data: formData,
        dataType: 'jsonp',
        success: function(data) {
            var err_code = data.err_code
            if (err_code === 0) {
                // 服务端重定向针对异步请求无效
                console.log(data)
                window.alert(data.message)
                window.location.href = '/'
            } else {
                window.alert(data.message)
            }
        }
    })
})


// 修改基本信息
$('#form-profile').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize()
    $.ajax({
        url: '/settings/profile',
        type: 'post',
        data: formData,
        dataType: 'jsonp',
        success: function(data) {
            let err_code = data.err_code
            if (err_code === 0) {
              console.log(data)
              window.alert(data.message)
              window.location.href = '/settings/profile'
            } else {
              window.alert(data.message)
            }
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


// 修改密码
$('#form-admin"').on('submit', function(e) {
    e.preventDefault()
    var formData = $(this).serialize()
    $.ajax({
        url: '/settings/admin',
        type: 'post',
        data: formData,
        dataType: 'jsonp',
        success: function(data) {
            let err_code = data.err_code
            if (err_code === 0) {
              console.log(data)
              window.alert(data.message)
              window.location.href = '/settings/admin'
            } else {
              window.alert(data.message)
            }
        }
    })
})