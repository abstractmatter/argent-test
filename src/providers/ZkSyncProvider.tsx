import { ethers } from 'ethers';
import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import * as zksync from 'zksync';
import abi from '../abis/guardians';
import { Loader } from '../components/Loader';
import { ChildrenProp } from '../types';

interface ZkSyncProvided {
  countGuardians: (address: string) => Promise<number>;
  ethersProvider: ethers.providers.BaseProvider;
  zkSyncProvider: zksync.Provider;
}

const providers = {
  infura: process.env.REACT_APP_INFURA_ID,
  alchemy: process.env.REACT_APP_ALCHEMY_ID,
};

const ethersProvider = ethers.getDefaultProvider('mainnet', providers);
const guardiansContract = new ethers.Contract(
  '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7',
  abi,
  ethersProvider,
);

const ZkSyncContext = createContext({} as ZkSyncProvided);

export const ZkSyncProvider: FC<ChildrenProp> = ({ children }) => {
  const [error, setError] = useState<string | Error>('');
  const [zkSyncProvider, setZkSyncProvider] = useState<zksync.Provider | null>(null);

  const countGuardians = useCallback(async (address: string): Promise<number> => {
    const count = await guardiansContract.guardianCount(address);

    return Number.parseInt(count, 10);
  }, []);

  useEffect(() => {
    zksync
      .getDefaultProvider('mainnet')
      .then((provider) => setZkSyncProvider(provider))
      .catch((e) => setError(e));
  }, []);

  if (error) {
    return (
      <>
        <h1>Ooops, an error occured. Please reload</h1>
        <h2>{String(error)}</h2>
      </>
    );
  }

  if (!zkSyncProvider) {
    return <Loader />;
  }

  return (
    <ZkSyncContext.Provider
      children={children}
      value={{ countGuardians, ethersProvider, zkSyncProvider }}
    />
  );
};

export const useZkSync = (): ZkSyncProvided => useContext(ZkSyncContext);
