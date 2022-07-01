import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      loading: false,
      logado: false,
      isButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.logIN = true;
  }

  componentWillUnmount() {
    this.logIN = false;
  }

  nameCondition = () => {
    const { nome } = this.state;
    const letrasMin = 3;
    this.setState({ isButtonDisabled: nome.length < letrasMin });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ nome: value }, this.nameCondition);
  }

  login = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { nome } = this.state;
      await createUser({ name: nome });
      if (this.logIN) this.setState({ loading: false, logado: true });
    });
  }

  render() {
    const { nome, loading, logado, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        {logado && <Redirect to="/search" />}
        {loading && <Loading />}
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="login-name-input"
              value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.login }
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
