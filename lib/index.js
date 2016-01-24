import * as r from 'request'
import HealthCheck from './healthcheck'
import config from './config'

const hc = new HealthCheck(config.get('urlToCheck'), (res500) => {
    if (res500) {
        hc.restartServer();
    }
});

function pollHealthCheck() {
    return setTimeout(() => {
        hc.ping();
        pollHealthCheck();
    }, 120000)
}
    
pollHealthCheck();
