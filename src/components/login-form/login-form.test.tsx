import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';

const getNameInp = () => screen.getByPlaceholderText('Name');
const getEmailInp = () => screen.getByPlaceholderText('Email');
const getSubmitBtn = () => screen.getByRole('button');

describe('LoginForm', () => {
  test('have inputs and sumbit button', () => {
    render(<LoginForm onSubmit={() => {}} />);
    expect(getNameInp()).toBeInTheDocument();
    expect(getEmailInp()).toBeInTheDocument();
    expect(getSubmitBtn()).toBeInTheDocument();
  });

  test('call submit handler', async () => {
    const handler = jest.fn();
    render(<LoginForm onSubmit={handler} />);
    await userEvent.type(getNameInp(), 'Bob');
    await userEvent.type(getEmailInp(), 'bob@example.com');
    await userEvent.click(getSubmitBtn());
    expect(handler).toBeCalledWith({ name: 'Bob', email: 'bob@example.com' });
  });

  test('show error message on submit empty input', async () => {
    const handler = jest.fn();
    render(<LoginForm onSubmit={handler} />);
    await userEvent.click(getSubmitBtn());
    expect(screen.getByText('Bad Input')).toBeInTheDocument();
    expect(handler).not.toBeCalled();
  });

  test('invalidate email field on submit invalid email', async () => {
    const handler = jest.fn();
    render(<LoginForm onSubmit={handler} />);
    await userEvent.type(getNameInp(), 'Bob');
    await userEvent.type(getEmailInp(), 'Bob');
    await userEvent.click(getSubmitBtn());
    expect(screen.getByPlaceholderText('Email')).toBeInvalid();
    
    // TODO: fails because jsdom allows to submit invalid form
    // https://github.com/jsdom/jsdom/issues/2898
    // expect(handler).not.toBeCalled();
  });
});
