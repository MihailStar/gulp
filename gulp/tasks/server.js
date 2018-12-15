import {directory} from '../configuration.js';
import browserSync from 'browser-sync';

const server = browserSync.create('server');

function initializeServer(done) {
  server.init({
    logPrefix: 'browser-sync',
    notify: false,
    online: false,
    open: false,
    port: 3000,
    reloadOnRestart: true,
    server: directory.dest,
    ui: false
  });
  done();
}

function reloadServer(done) {
  server.reload();
  done();
}

export {initializeServer, reloadServer};
export default server;