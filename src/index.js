import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ChatContainer from './containers/ChatContainer';

import registerServiceWorker from './registerServiceWorker';


/**
 * @todo die URL-Parameter und access_keys sind nur als Beispiel gedacht.
 * Dieser Part sollte durch echte Token aus der Anwendung ersetzt werden.
 */
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
var userId = findGetParameter('userId');

var access_keys = new Map()
    .set(1, 'dd38e564-82ae-455e-b14f-b456b00ac4dc')
    .set(2, '8f9a2583-d3c1-489c-9ede-0ec1dd9e0be2')
    .set(3, '2b02401a-12fc-4252-87e9-c5676cb575fd');

var access_key = access_keys.get(+userId);

ReactDOM.render(<ChatContainer access_key={access_key} />, document.getElementById('root'));
registerServiceWorker();
