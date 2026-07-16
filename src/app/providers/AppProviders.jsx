import React from 'react';
import { WalletProvider } from './WalletContext';
import { BlockchainProvider } from './BlockchainContext';
import { TransactionProvider } from './TransactionContext';
import { ActivityLogProvider } from './ActivityLogContext';

export const AppProviders = ({ children }) => {
  return (
    <ActivityLogProvider>
      <TransactionProvider>
        <BlockchainProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </BlockchainProvider>
      </TransactionProvider>
    </ActivityLogProvider>
  );
};

export default AppProviders;