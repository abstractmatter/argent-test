import { FC } from 'react';
import { Spinner } from './Spinner';

export const Loader: FC = () => (
  <div className="h-full w-full p-4 text-center">
    <Spinner />
  </div>
);
