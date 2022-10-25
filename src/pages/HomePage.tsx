import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Account, AccountWithGuardians } from '../components/Account';
import { Loader } from '../components/Loader';
import { Page } from '../components/Page';
import { ArgentSigle, SearchIcon } from '../icons';
import { useZkSync } from '../providers/ZkSyncProvider';

const addressValidationRegexp = /^0x[a-fA-F0-9]{40}$/;

export const HomePage: FC = () => {
  const { countGuardians, zkSyncProvider } = useZkSync();
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState<AccountWithGuardians | null>(null);
  const [loading, setLoading] = useState(false);

  const invalidAddress = !addressValidationRegexp.test(address);

  const fetchInfo = useCallback(async () => {
    setAccount(null);
    setLoading(true);

    const [state, gardiansCount] = await Promise.allSettled([
      zkSyncProvider.getState(address),
      countGuardians(address),
    ]);

    console.log(state, gardiansCount);
    setLoading(false);

    if (state.status !== 'fulfilled') {
      toast.error(`An error occured getting account information: ${state.reason.reason}`, {
        duration: 2000,
      });

      return;
    }

    if (gardiansCount.status !== 'fulfilled') {
      toast.error(
        <p>
          <strong>An error occured getting Guardians</strong> <br /> {gardiansCount.reason.reason}
        </p>,
        {
          duration: 2000,
        },
      );

      return;
    }

    setAccount({ ...state.value, gardiansCount: gardiansCount.value });
  }, [address, countGuardians, zkSyncProvider]);

  return (
    <Page>
      <header>
        <ArgentSigle className="h-12 w-12" />
      </header>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Enter your Argent wallet address</span>
        </label>
        <div className="input-group">
          <input
            className="input-bordered input w-full"
            onChange={(e) => {
              setAddress(e.target.value);
              setAccount(null);
            }}
            placeholder="Your wallet…"
            type="text"
            value={address}
          />
          <button
            className="btn-square btn"
            disabled={invalidAddress || loading}
            onClick={fetchInfo}
          >
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      {invalidAddress && <p>Please provide a valid address</p>}
      {loading ? <Loader /> : account ? <Account {...account} /> : null}
    </Page>
  );
};
