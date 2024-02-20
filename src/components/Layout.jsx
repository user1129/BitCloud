import { Outlet } from 'react-router-dom';

// Layout.js


import Header from './header/Header';

/**
 * Layout component that includes a common header and renders nested routes using the Outlet.
 * @returns {JSX.Element} - Layout component.
 */
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
