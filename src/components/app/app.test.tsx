import axios from 'axios';
import { render, screen, waitFor, act } from '../../test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './app';
import { posts, auth } from '../../mocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  test('login form', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText(/GO/i)).toBeInTheDocument();
  });

  test('able to login and logout', async () => {
    mockedAxios.post.mockResolvedValue({ data: { data: auth } });
    mockedAxios.get.mockResolvedValue({ data: { data: { posts } } });

    render(<App />);

    //not logged in
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();

    //enter credentials
    await userEvent.type(screen.getByPlaceholderText('Name'), 'Tom');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'Tom@example.com');
    await userEvent.click(screen.getByText(/GO/i));

    //check data calls
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(10));

    //check if users are rendered
    const users = await screen.findAllByTestId('users');
    expect(users).toHaveLength(1);
    const userList = await screen.findAllByTestId('user-list');
    expect(userList).toHaveLength(1);
    const userItems = await screen.findAllByTestId('user');
    expect(userItems).toHaveLength(4);
    const postItems = await screen.findAllByTestId('post');
    expect(postItems).toHaveLength(2);

    //logout
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(screen.getByText(/Logout/i));
    });
    expect(screen.queryByTestId('users')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });
});
