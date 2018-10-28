import React from 'react';
import ReactDOM from 'react-dom';
// The default locale is en-US, but we can change it to other language
import moment from 'moment';
import 'moment/locale/br';
import App from "./todo/App";

moment.locale('br');


ReactDOM.render(<App />, document.getElementById('root'));