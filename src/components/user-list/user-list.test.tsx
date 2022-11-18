import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import UserList from './user-list';
import { normalizedData } from '../../mocks';
import { IUser } from '../../types/user';

//prepare users posts data that looks like in store
const mockUsers = Object.values(normalizedData.users);

const noUsersMsg = () => screen.queryByText(/Please wait for data loading/i);
const userEls = () => screen.queryAllByTestId('user');
const searchInp = () => screen.getByPlaceholderText('Search');

describe('UserList', () => {
  test('render message when no data', () => {
    const users: IUser[] = [];
    render(<UserList users={users} />);
    expect(noUsersMsg()).toBeInTheDocument();
  });

  test('render user list', () => {
    render(<UserList users={mockUsers} />);
    expect(noUsersMsg()).not.toBeInTheDocument();
    expect(userEls()).toHaveLength(4);
    expect(screen.queryByText(/Carly Alvarez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Britany Heise/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ethelene Maggi/i)).toBeInTheDocument();
    expect(screen.queryByText(/Carson Smithson/i)).toBeInTheDocument();
  });

  test('filtering posts', async () => {
    render(<UserList users={mockUsers} />);
    expect(userEls()).toHaveLength(4);

    await userEvent.type(searchInp(), 'Maggi');
    expect(screen.queryAllByText(/Maggi/i)).toHaveLength(1);
    expect(userEls()).toHaveLength(1);

    await userEvent.clear(searchInp());
    await userEvent.type(searchInp(), 'alvarez');
    expect(screen.queryAllByText(/Alvarez/i)).toHaveLength(1);
    expect(userEls()).toHaveLength(1);

    await userEvent.type(searchInp(), 'zzzxxx');
    expect(screen.queryAllByText(/alvarezzzzxxx/i)).toHaveLength(0);
    expect(userEls()).toHaveLength(0);

    await userEvent.clear(searchInp());
    expect(userEls()).toHaveLength(4);
  });

  test('render post counter', async () => {
    render(<UserList users={mockUsers} />);
    expect(userEls()).toHaveLength(4);

    await userEvent.type(searchInp(), 'Maggi');
    expect(screen.queryByText(/2/i)).toBeInTheDocument();
  });
});
