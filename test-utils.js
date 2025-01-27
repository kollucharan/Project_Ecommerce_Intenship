// import React from 'react';
// import { render as rtlRender } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { createMemoryHistory } from 'history';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { store } from './src/Reduxstore/store';

// function render(
//   ui,
//   {
//     // path = '/',
//     route = '/',
//     initialState,
//     history = createMemoryHistory({ initialEntries: [route] }),
//     store = store({}, history),
//     ...renderOptions
//   } = {},

// ) {
//   function Wrapper({ children }) {
//     return (
//       <Provider store={store}>
//         <MemoryRouter>
//           {children}
//         </MemoryRouter>
//       </Provider>
//     );
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// export * from '@testing-library/react';
// export { render };
