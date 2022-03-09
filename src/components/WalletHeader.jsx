import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string, arrayOf } from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`email: ${email}`}
        </span>
        <span data-testid="total-field">
          Total:
          <span data-testid="TOTAL_FIELD_TEST_ID">
            {expenses.reduce((acc, { value, currency, exchangeRates }) => (
              acc + (Number(value) * exchangeRates[currency].ask)), 0)}
          </span>
        </span>
        <span data-testid="header-currency-field">
          Moeda: BRL
        </span>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  expenses: arrayOf(PropTypes.object).isRequired,
  email: string.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
