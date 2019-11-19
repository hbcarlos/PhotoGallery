import React from 'react';

import NavBar from './NavBar.js';

function Page404() {
  return (
    <div className="Page404">
      <NavBar/>
      <h1> Error 404: Page not found</h1>
      <h2> La ruta a la que intentas acceder no existe.</h2>
    </div>
  );
}

export default Page404;