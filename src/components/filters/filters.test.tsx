import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from './filters';

describe('Filters', () => {
  test('search field', async () => {
    const handler = jest.fn();
    render(<Filters onSearchChange={handler} />);
    await userEvent.type(screen.getByPlaceholderText('Search'), 'TeSt');
    expect(handler).toHaveBeenCalledTimes(4);
    expect(handler).toHaveBeenLastCalledWith('test');
  });
  
  test('sorting buttons', async () => {
    const handler = jest.fn();
    render(<Filters onSearchChange={() => {}} onDescChange={handler} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    await userEvent.click(buttons[0]);
    expect(handler).toHaveBeenLastCalledWith(false);
    await userEvent.click(buttons[1]);
    expect(handler).toHaveBeenLastCalledWith(true);
  });

  test('option not to have sorting buttons', async () => {
    render(<Filters onSearchChange={() => {}} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });
});
