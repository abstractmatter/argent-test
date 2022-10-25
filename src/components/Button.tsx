import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    {...props}
    className={clsx(
      className,
      'm-2 inline-flex h-8 items-center rounded px-6 font-semibold text-white disabled:opacity-25',
    )}
  />
);

export default Button;
