import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Sprites from './assets/sprites.svg';
import Providers from './providers';
import './index.css';

const element = document.getElementById('root');
if (!element) {
  throw new Error('Missing root element');
}

const root = createRoot(element);
root.render(
  <StrictMode>
    <Providers>
      <App />
      {/**
       * Pre-load the sprites and move the `svg` element into the main document
       * to be able to `<use />` its symbols directly with their `#id`
       */}
      <object
        className="sprites"
        data={Sprites}
        onLoad={(event) => {
          const svg = event.currentTarget.contentDocument?.getElementsByTagName('svg')[0];
          if (svg) {
            document.body.appendChild(svg);
          } else {
            throw new Error(
              'Unable to load icons, please check your connection and reload the page',
            );
          }
        }}
        type="image/svg+xml"
      >
        SVG Sprites
      </object>
    </Providers>
  </StrictMode>,
);
