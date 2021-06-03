const { React, getModule } = require('powercord/webpack');

const AuthBox = getModule(m => m.title && typeof m.title == 'string' && m.authBoxPadding, false);
const { marginBottom20, marginTop20, marginBottom8 } = getModule(['marginBottom8'], false);
const { mainLoginContainer } = getModule(['mainLoginContainer'], false);
const { verticalSeparator } = getModule(['verticalSeparator'], false);
const colors = getModule(['colorHeaderPrimary'], false);
const { setToken } = getModule(['setToken'], false);
const inputModule = getModule(['inputWrapper'], false);
const contents = getModule(['contents'], false);
const sizes = getModule(['size24'], false);
const titles = getModule(['h5'], false);

module.exports = class TokenLogin extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return ([
         <div class={verticalSeparator}></div>,
         <div className={mainLoginContainer}>
            <div className={`${colors.colorHeaderPrimary} ${sizes.size24} ${AuthBox.title} ${marginBottom8}`}>
               Connect with Token
                </div>
            <div className={`${colors.colorHeaderSecondary} ${sizes.size16}`}>
               Input your token below
                </div>
            <div className={`${AuthBox.block} ${marginTop20}`}>
               <div className={marginBottom20}>
                  <TokenInput ref='input' />
               </div>
               <button type='submit' className={`${marginBottom8} ${AuthBox.button} ${contents.button} ${contents.lookFilled} ${contents.colorBrand} ${contents.sizeLarge} ${contents.fullWidth} ${contents.grow}`} onClick={(ev) => {
                  if (!this.refs.input.state.value) {
                     return this.refs.input.setState({ error: 'This field is necessary' });
                  }

                  setToken(this.refs.input.state.value);
                  ev.stopPropagation();
                  window.location.reload();
               }}>
                  <div className={contents.contents}>
                     Login
                  </div>
               </button>
            </div>
         </div>
      ]);
   }
};

class TokenInput extends React.Component {
   constructor(...args) {
      super(...args);

      this.state = {
         value: '',
         error: null
      };
   }

   render() {
      return [
         <h5 className={`${colors.colorStandard} ${sizes.size14} ${titles.h5} ${titles.defaultMarginh5}${this.state.error ? ' ' + titles.error : ''}`}>
            Token
                {this.state.error ? <span class={titles.errorMessage}>
               <span class={titles.errorSeparator}>-</span>{this.state.error}
            </span> : null}
         </h5>,
         <div className={inputModule.inputWrapper}>
            <input className={`${inputModule.inputDefault}${this.state.error ? ' ' + inputModule.inputError : ''}`} name='token' type='token' placeholder aria-label='Token' autoComplete='off' maxLength={999} spellCheck='false' value={this.state.value} onChange={(ev) => {
               this.setState({
                  value: ev.target.value
               });
            }} />
         </div>
      ];
   }
}