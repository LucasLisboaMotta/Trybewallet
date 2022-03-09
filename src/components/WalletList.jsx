import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { arrayOf, func } from 'prop-types';
import { removeItem, startEditItem } from '../actions';

class WalletList extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição </th>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Moeda de conversão</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, description, value, currency, method, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{(Number(value)).toFixed(2)}</td>
                <td>Real</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>{method}</td>
                <td>{tag}</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => dispatch(startEditItem(id)) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => dispatch(removeItem(id)) }
                    data-testid="delete-btn"
                  >
                    Exclui
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

WalletList.propTypes = {
  expenses: arrayOf(PropTypes.object).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(WalletList);
