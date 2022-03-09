import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import WalletList from '../components/WalletList';

export default class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletForm />
        <WalletList />
      </>
    );
  }
}
