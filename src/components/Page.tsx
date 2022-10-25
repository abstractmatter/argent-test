import { FC } from 'react';
import { ChildrenProp } from '../types';

export const Page: FC<ChildrenProp> = ({ children }) => <div className="prose p-4">{children}</div>;
