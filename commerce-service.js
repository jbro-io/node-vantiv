'use strict';
//================================================================================
// Libraries
//================================================================================
var request = require('request');

//================================================================================
// Private Variables
//================================================================================
var _sessionToken = '';
var _host         = 'https://api.cert.vantiv.com';
var _version      = '2.0.18';
var _identityToken;

//================================================================================
// Module
//================================================================================
function Connection(identityToken) {
    //TODO: throw error if token isn't in constructor
    _identityToken = identityToken;
}

Connection.prototype.isSignedOn = function() {
    return (_sessionToken != '') ? true : false;
}

Connection.prototype.signOn = function(callback) {
    if(_sessionToken == '') {
        var options = {
            method: 'GET',
            url: _host + '/REST/'+ _version +'/SvcInfo/token',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + _identityToken
            }
        };

        request(options, function(error, response, body) {
            if(error) return callback(error);

            var token = body.substr(1, (body.length - 2));
            _sessionToken = new Buffer(token + ':').toString('base64');

            callback(null, _sessionToken);
        });
    }
}

Connection.prototype.getServiceInformation = function(callback) {
    //TODO: check for valid session token
    var options = {
        method: 'GET',
        url: _host + '/REST/'+ _version +'/SvcInfo/serviceInformation',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        }
    };

    request(options, function(error, response, body) {
        if(error) return callback(error);
        callback(null, body);
    });
}

Connection.prototype.saveApplicationData = function(appData, callback) {
    //TODO: check for valid session token
    var options = {
        method: 'PUT',
        url: _host + '/REST/'+ _version +'/SvcInfo/appProfile',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        },
        body: appData
    };

    request(options, function(error, response, body) {
        console.log('saveApplicationData Response:', body);
        if(error) return callback(error);
        callback(null, body);
    });
}

Connection.prototype.getApplicationData = function(appId, callback) {
    //TODO: check for valid session token
    //TODO: check for appId
    var options = {
        method: 'GET',
        url: _host + '/REST/'+ _version +'/SvcInfo/appProfile/' + appId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        }
    };

    request(options, function(error, response, body) {
        if(error) return callback(error);
        callback(null, body);
    });
}

Connection.prototype.saveMerchantProfile = function(merchantProfile, serviceId, callback) {
    //TODO: check for valid session token
    //TODO: check for merchantData
    //TODO: check for serviceId
    var options = {
        method: 'PUT',
        url: _host + '/REST/'+ _version +'/SvcInfo/merchProfile?serviceId=' + serviceId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        },
        body: merchantProfile
    };

    request(options, function(error, response, body) {
        if(error) return callback(error);
        callback(null, body);
    });
}

Connection.prototype.getMerchantProfile = function(merchantProfileId, serviceId, callback) {
    //TODO: check for valid session token
    //TODO: check for merchantData
    //TODO: check for serviceId
    var options = {
        method: 'GET',
        url: _host + '/REST/'+ _version +'/SvcInfo/merchProfile/'+ merchantProfileId +'?serviceId=' + serviceId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        }
    };

    request(options, function(error, response, body) {
        if(error) return callback(error);
        callback(null, body);
    });
}

Connection.prototype.getMerchantProfiles = function(serviceId, callback) {
    //TODO: check for valid session token
    //TODO: check for serviceId
    var options = {
        method: 'GET',
        url: _host + '/REST/'+ _version +'/SvcInfo/merchProfile?serviceId=' + serviceId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _sessionToken
        }
    };

    request(options, function(error, response, body) {
        if(error) return callback(error);
        callback(null, body);
    });
}

module.exports = Connection;