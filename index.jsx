const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, React } = require('powercord/webpack');
const { findInReactTree } = require('powercord/util');

const LoginScreen = getModule(m => m.default?.displayName == 'AuthBox', false);

const Login = require('./components/TokenLogin');

module.exports = class TokenLogin extends Plugin {
   startPlugin() {
      inject('token-login', LoginScreen, 'default', (args, res) => {
         const children = findInReactTree(res, c => Array.isArray(c) && c.find?.(a => a?.props?.className.includes('mainLoginContainer')));
         children?.splice(1, 0, <Login />);

         return res;
      });
      LoginScreen.default.displayName = 'AuthBox';
   }

   pluginWillUnload() {
      uninject('token-login');
   }
};