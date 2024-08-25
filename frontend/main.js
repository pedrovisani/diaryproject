import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/login';

import './assets/css/style.css';

const login = new Login('#formLogin');
const cadastro = new Login('#formCadastro');

login.init();
cadastro.init();