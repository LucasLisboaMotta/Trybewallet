import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletList extends Component {
  render() {
    return (
      <table>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Valor convertido
          </th>
          <th>
            Moeda
          </th>
          <th>
            Câmbio utilizado
          </th>
          <th>
            Moeda de conversão
          </th>
          <th>
            Método de pagamento
          </th>
          <th>
            Tag
          </th>
          <th>
            Editar/Excluir
          </th>
        </tr>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletList);
