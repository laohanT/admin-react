import React from 'react';
import './App.css';
import routes from './router/routes';
import { useLocation, useRoutes } from 'react-router';
import Layout from './layout/layout';
const AppRoutes = () => {
  const routing = useRoutes(routes);
  return routing;
}
function App() {
  const router = useLocation()
  const isLogin = router.pathname.indexOf('login') >= 0
  return (
    <div >
      {
        isLogin ? <AppRoutes />
          : <Layout>
            <AppRoutes />
          </Layout>
      }


    </div>
  );
}

export default App;

