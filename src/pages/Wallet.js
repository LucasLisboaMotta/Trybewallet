import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
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
        <main>
          <WalletForm />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
