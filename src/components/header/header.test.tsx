import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Header from './header';

const props = {
  authName: 'Bob',
  loading: false,
  logout: () => {},
};

describe('Header', () => {
  test('logged in state', () => {
    render(<Header {...props} />);
    expect(screen.getByText(/Logged as Bob/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('logged out state', () => {
    render(<Header {...props} authName='' />);
    expect(screen.queryByText(/Logged as Bob/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('call logout handler', async () => {
    const handler = jest.fn();
    render(<Header {...props} logout={handler} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toBeCalled();
  });

  test('show and hide loader', async () => {
    const header = render(<Header {...props} loading={true} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    header.rerender(<Header {...props} loading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
