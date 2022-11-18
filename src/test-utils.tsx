import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import store from './redux/store';
import history from './history';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ReduxRouter history={history}>{children}</ReduxRouter>
      </Provider>
    </React.StrictMode>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
