import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validEmail from '../validacao/email';
import validPassword from '../validacao/passwod';
import { loginEmail } from '../actions';

class Login extends Component {
  state = { email: '', password: '' }

 inputChange = ({ target: { value, name } }) => this.setState({ [name]: value });

 onClick = () => {
   const { history, dispatch } = this.props;
   const { email } = this.state;
   dispatch(loginEmail(email));
   history.push('/carteira');
 }

 render() {
   const { email, password } = this.state;
   return (
     <div>
       <label htmlFor="email">
         Email:
         <input
           id="email"
           name="email"
           value={ email }
           data-testid="email-input"
           onChange={ this.inputChange }
         />
       </label>
       <label htmlFor="password">
         Senha:
         <input
           id="password"
           type="password"
           name="password"
           value={ password }
           data-testid="password-input"
           onChange={ this.inputChange }
         />
       </label>
       <button
         type="button"
         disabled={ !(validEmail(email) && validPassword(password)) }
         onClick={ this.onClick }
       >
         Entrar
       </button>
     </div>
   );
 }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
