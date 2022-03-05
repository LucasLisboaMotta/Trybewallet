import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletList extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
        {expenses
          .map(({ id, description, value, currency, method, tag, exchangeRates }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{(Number(value)).toFixed(2)}</td>
              <td>Real</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
              <td>{method}</td>
              <td>{tag}</td>
              <td>botão</td>
            </tr>
          ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
};

export default connect(mapStateToProps)(WalletList);
