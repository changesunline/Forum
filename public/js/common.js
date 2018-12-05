(function() {
    define(['jquery'], function($) {

        // 导出模块
        return {
        	ajaxPost: function (element, url, callback) {
                $(element).on('submit', function(e) {
                    e.preventDefault()
                    var formData = $(this).serialize()
                    console.log(formData)
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: formData,
                        dataType: 'jsonp',
                        success: function(data) {
                            callback && callback(data)
                        }
                    })
                })
            }
        }
    })
}())