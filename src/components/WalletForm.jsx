import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { arrayOf, func, bool, number, string } from 'prop-types';
import { saveItem, editItem, getCurrencies } from '../actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

class WalletForm extends Component {
  state = {
    description: '',
    value: '',
    currency: 'CAD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // didUptate: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  // componentDidUpdate() {
  //   const { edit } = this.props;
  //   if (edit) this.vaiNoTeste();
  // }

  onInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  // vaiNoTeste = async () => {
  //   const { didUptate } = this.state;
  //   if (didUptate) {
  //     const { expenses, idEdit } = this.props;
  //     const find = expenses.find(({ id }) => id === idEdit);
  //     const getApi = await fetch(URL);
  //     const resolve = await getApi.json();
  //     const exchangeRates = Object.keys(resolve).filter((current) => current !== 'USDT');
  //     this.setState({ ...find, didUptate: false, exchangeRates });
  //   }

  onSaveButton = async () => {
    const { description, value, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const getApi = await fetch(URL);
    const exchangeRates = await getApi.json();
    dispatch(saveItem({ description, value, currency, method, tag, exchangeRates }));
    this.setState({ description: '', value: '' });
  }

  editButton = () => {
    const { description, value, currency, method, tag } = this.state;
    const { dispatch, expenses, idEdit: id } = this.props;
    const { exchangeRates } = expenses.find(({ id: id2 }) => id2 === id);
    const newItem = { description, value, currency, method, tag, exchangeRates, id };
    dispatch(editItem(newItem));
    this.setState({ description: '', value: '' });
  }

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { edit, currencies } = this.props;
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
            {currencies.map((current) => (
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
        {}
        <button
          type="button"
          onClick={ edit ? this.editButton : this.onSaveButton }
          disabled={ !(description.length > 0 && value.length > 0) }
        >
          {edit ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  expenses: arrayOf(PropTypes.object).isRequired,
  dispatch: func.isRequired,
  edit: bool.isRequired,
  idEdit: number.isRequired,
  currencies: arrayOf(string).isRequired,
};

const mapStateToProps = ({ wallet: { expenses, edit, idEdit, currencies } }) => ({
  expenses, edit, idEdit, currencies,
});

export default connect(mapStateToProps)(WalletForm);
