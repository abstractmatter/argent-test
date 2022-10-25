import { FC } from 'react';
import { utils } from 'zksync';
import { AccountState } from 'zksync/build/types';
import { useZkSync } from '../providers/ZkSyncProvider';

export interface AccountWithGuardians extends AccountState {
  gardiansCount: number;
}

export const Account: FC<AccountWithGuardians> = (account) => {
  const {
    zkSyncProvider: { tokenSet },
  } = useZkSync();

  const {
    verified: { balances },
  } = account;

  return (
    <>
      <h3 className="mt-5 mb-2 text-xl font-bold">Wallet Balance</h3>
      <p>{`${tokenSet.formatToken('ETH', balances.ETH || 0) || 0} ETH`}</p>
      <h3 className="mt-5 mb-2 text-xl font-bold">Number of Guardians</h3>
      <p>{account.gardiansCount}</p>
      <h3 className="mt-5 mb-2 text-xl font-bold">ERC20 tokens</h3>
      <ul>
        {Object.entries(balances)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([token, value]) => {
            if (utils.isTokenETH(token)) {
              return null;
            }

            return (
              <li key={token}>
                <strong>{token}</strong>: {tokenSet.formatToken(token, value)}
              </li>
            );
            // return <li key={token}>{`${token}: ${tokenSet.formatToken(token, value)}`}</li>;
          })}
      </ul>
    </>
  );
};
