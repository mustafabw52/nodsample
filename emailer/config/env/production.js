/**
 * Created date 27/09/2016.
 */
!(function() {
    'use strict';

    module.exports = {
        sitename: '',
        app: {
             email: 'user1@neuronsolutions.com',
            password: 'test123',
            name: '',
            gcm_api_key: '',
            siteurl: 'http://localhost:4000/'
        },
        database: {
            mysql: {
                host: '',
                user: '',
                password: '',
                db: ''
            },
            mongodb: {
                url: 'mongodb://localhost:27017/homeguide_prod'

            }
        },
        mail: {
            from_email: 'user1@neuronsolutions.com',
            from_name: 'Test Mail',
            email_host: 'elite346.inmotionhosting.com'
        }
    };
})();