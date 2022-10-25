import { PathRouteProps } from 'react-router';
import { HomePage } from './HomePage';

const routes: Record<string, PathRouteProps> = {
  home: { path: '/', element: <HomePage /> },
  four0four: {
    path: '*',
    element: (
      <main>
        <p>👻 There's nothing here 👀</p>
      </main>
    ),
  },
};

export default routes;
