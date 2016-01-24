import request from 'request'
import config from './config'

let agent = require('superagent');

export default class HealthCheck {
    constructor(urlToCheck, cb) {

        if (!urlToCheck) throw new Error('Please provide a url to check as a first argument. ex: new HealthCheck("http://google.com", callback)');
        if (!cb) throw new Error('Please provide a callback as a second argument. ex: new HealthCheck("http://google.com", callback)');
            
        this.urlToCheck = urlToCheck;
        this.cb = cb;
        this.baseOceanApi = 'https://api.digitalocean.com/v2';
    }
    ping() {
        agent
        .get(this.urlToCheck)
        .end((err, res) => {
            console.log(this.urlToCheck, 'status: ', res.statusCode);
            if (res.statusCode >= 500) {
                this.cb(true);
            } else {
                this.cb(false);
            }
        });
    }
    restartServer() {
        const apiUrl = `${this.baseOceanApi}/droplets/${config.get('ocean').dropletId}/actions`;

        agent
        .post(apiUrl)
        .send({ type: 'reboot'})
        .set('Authorization', 'Bearer ' + config.get('ocean').token)
        .set('Accept', 'application/json')
        .end((err, res) => {
            // Calling the end function will send the request 
        });
    }
}

