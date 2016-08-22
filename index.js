var ping = require('ping');
var Promise = require('bluebird');
var YAML = require('yamljs');

nativeObject = YAML.load('ipList.yml');
var hosts = nativeObject.ips;

var getEmptyIPs = function(){
    var remainIPs = [];
    var resultIPs = [];
    var emptyHosts = hosts.forEach(function(host){
        var currentHost = ping.promise.probe(host);
        remainIPs.push(currentHost);
    });
    var resultSet = Promise.all(remainIPs).then(function(host){
        return host.filter(function(res){
            return !res.alive;
        });
    })
    // .then(function(ipresult){
    //     console.log(result);
    //     return ipresult;
    // });
    // all.then(function(result){
    //     console.log(result);
    // })
    // console.log(all);
    return resultSet;
}
module.exports = getEmptyIPs;
// var xxx = getEmptyIPs();
// xxx.then(function(result){
//     console.log(result);
// })
// console.log(xxx);