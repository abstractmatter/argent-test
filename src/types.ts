import { BigNumber } from 'ethers';
import { ReactNode } from 'react';
import { ContractInterface } from 'ethers';

export interface Contract {
  abi: ContractInterface;
  contractName: string;
  sourceName: string;
}

export interface DeployedContract {
  contract: Contract;
  [chainId: number]: string;
}

export type DeployedContracts = Record<string, DeployedContract>;

export interface TinyDuser {
  at: string;
  atWithKey?: string;
  chain: string;
  handle: string;
  key?: string;
}

export interface Duser {
  at: string;
  atWithKey: string;
  chain: string;
  expiresAt: Date;
  handle: string;
  heir: string;
  key: string;
  mintedAt: Date;
  name: string;
  owner: string;
  pfpUrl: string;
  profileUrl: string;
}

export type RawDuserResult = [
  chain: string,
  expiresAt: BigNumber,
  handle: string,
  heir: string,
  key: string,
  mintedAt: BigNumber,
  name: string,
  owner: string,
  pfpUrl: string,
  profileUrl: string,
];

export interface ChildrenProp {
  children: ReactNode;
}

export interface ClassProp {
  className?: string;
}
