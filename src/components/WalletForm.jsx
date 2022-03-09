import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { arrayOf, func, bool, number, string } from 'prop-types';
import { saveItem, editItem, getCurrencies } from '../actions';
import optionsReder from '../helper/optionsRender';

class WalletForm extends Component {
  state = {
    description: '',
    value: '',
    currency: 'CAD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  onInputChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  onSaveButton = async () => {
    const { description, value, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    dispatch(saveItem({ description, value, currency, method, tag }));
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
            value={ value }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.onInputChange }
          >
            {optionsReder(currencies)}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          <select
            id="method"
            value={ method }
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
