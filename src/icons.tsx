import { FC, SVGProps } from 'react';

export interface SVGIcon extends SVGProps<SVGSVGElement> {
  title?: string;
}

const icon =
  (name: string): FC<SVGIcon> =>
  ({ title, ...props }: SVGIcon) => {
    return (
      <svg {...props}>
        {title && <title>{title}</title>}
        <use href={`#${name}`} />
      </svg>
    );
  };

export const ArgentLogo = icon('argent-logo');
export const ArgentSigle = icon('argent-sigle');
export const SearchIcon = icon('search-icon');
