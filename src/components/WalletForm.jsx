import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenses } from '../actions';

class WalletForm extends Component {
  state = {
    description: '',
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  onInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  disabledButton = () => !Object.values(this.state).every(({ length }) => length > 0);

  componentDidMount = async () => {
    const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resolve = await getApi.json();
    const exchangeRates = Object.keys(resolve).filter((current) => current !== 'USDT');
    this.setState({ exchangeRates });
  };

  onSaveButton = async () => {
    const { dispatch } = this.props;
    const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await getApi.json();
    dispatch(expenses({ ...this.state, exchangeRates }));
    this.setState({ description: '', value: '' });
  }

  render() {
    const { description, value, currency, method, tag, exchangeRates } = this.state;
    return (
      <form>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            {exchangeRates.map((current) => (
              <option
                value={ current }
                key={ current }
              >
                {current}
              </option>))}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          <select
            id="method"
            value={ method }
            name="method"
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            value={ tag }
            name="tag"
            data-testid="tag-input"
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onSaveButton }
          disabled={ this.disabledButton() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
