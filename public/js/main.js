(function () {
	require.config({
        // baseUrl: 'js/lib'
        paths: {
            jquery: '../../node_modules/jquery/dist/jquery',
            common: './common',
            user: './user'
        }
    })

    require(['user'], function(user) {

    })
}())