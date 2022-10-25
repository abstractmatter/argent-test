import { FC } from 'react';
import { Route, Routes } from 'react-router';
import routes from './pages/routes';

const App: FC = () => {
  return (
    <Routes>
      {Object.values(routes).map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
};

export default App;
