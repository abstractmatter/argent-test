import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { ZkSyncProvider } from './ZkSyncProvider';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Toaster />
    <BrowserRouter>
      <ZkSyncProvider>{children}</ZkSyncProvider>
    </BrowserRouter>
  </>
);

export default Providers;
