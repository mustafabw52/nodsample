var express = require('express')
        , app = express()
        , spawn = require('child_process').spawn
//   , config = require('./config/env/' + (process.env.NODE_ENV || 'production'))
        , d = new Date();
var swagger = require('swagger-express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apiRoute = require('./routes/apis');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiRoute);

//app.use('/api/*',function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});


app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './swagger/',
    apiUrl: 'http://localhost:8090/api/users',
    apiVersion:'1.0',
            basePath: 'http://localhost:8090',
    info: {
        title: 'swagger-express sample app',
        description: 'Swagger + Express = {swagger-express}'
    },
    apis: ['./swagger/include/user.js',
        './swagger/include/project.js',
    ],
    middleware: function (req, res) {
    }
}));

mongoose.connect('mongodb://localhost:27017/project', function (err) {
    if (err) {
        console.log(err);
        process.exit(0);
    } else {
        console.log('Mongodb connected');
    }
});



function sendEmail(options, callback) {
    var options = options || {};
    var from = options.fromName ? options.fromName + '<' + options.fromEmail + '>' : options.fromEmail;
//        var server = options.serverUrl ? ['-s', options.serverUrl] : [];
    var server = options.serverUrl ? ['-s', options.serverUrl, '-xu', config.app.email, '-xp', config.app.password] : [];
    var args = ['-f', from, '-t', options.toAddresses, '-o', 'message-content-type=' + options.contentType, '-u', options.subject, '-m', options.message].concat(server);
    try {
        var mail = spawn(options.sendEmailPath, args);
        mail.stdout.on('data', function (data) {
            console.log('We received a reply: ' + data);
            var output = data.toString('utf-8');
            var message = output.split(']:');
            if (output.match(/success/gi)) {
                console.log('success');
                callback(null, message.length ? message[1].trim() : 'unknown');
            } else {
                console.log('error');
                var error = new Error();
                error.name = 'SendemailError';
                error.message = message.length ? message[1].trim() : 'Unknown error';
                callback(error);
            }
        });

        mail.stderr.on('data', function (data) {
            console.log('There was an error: ' + data);
            callback(data);
        });
        mail.on('error', function (data) {
            console.log('There was an error: ' + data);
            callback(data);
        });
    }
    catch
            (e) {
        callback(e);
    }
}

app.get('/email', function (req, res) {
    var template = req.body.html
            , toEmail = req.body.from_email
            , subject = req.body.subject;
    var options = {
        fromName: config.mail.from_name,
        fromEmail: config.mail.from_email,
        toAddresses: toEmail,
        ccAddresses: [''],
        bccAddresses: [''],
        subject: subject,
        message: template,
        contentType: 'html',
        sendEmailPath: 'sendemail',
        serverUrl: config.mail.email_host
    };

    sendEmail(options, function (error, data) {
        if (error) {
            res.json({success: false, data: [], message: error});
        } else {
            res.json({success: true, data: [], message: "Mail successfully sent."});
        }

    });
});

app.listen(8090);