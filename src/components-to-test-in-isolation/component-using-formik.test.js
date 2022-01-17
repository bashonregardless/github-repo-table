import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ComponentForm from './component-using-formik.js';

describe('test suites', () => {
  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()
    render(<ComponentForm onSubmit={handleSubmit} />)
    const btn = screen.getByRole('button', { name: /post/i });
    const textbox = screen.getByRole('textbox');

    userEvent.type(textbox, 'Hello,{enter}World!');
    expect(textbox).toHaveValue('Hello,\nWorld!');
    userEvent.click(btn)

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
	comment: "Hello,\nWorld!"
      }),
    )
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  //  it('should render disabled button', () => {
//    const { btn } = setupComponent();
//    expect(btn).toBeInTheDocument();
//    expect(btn).toHaveAttribute('disabled');
//  });
//
//  it('should enable post button when textbox has one or more than one characters', () => {
//    const { textbox, btn } = setupComponent();
//    fireEvent.change(textbox, { target: { value: 'Good day' } });
//    expect(textbox).toHaveValue('Good day');
//
//    expect(btn).not.toHaveAttribute('disabled');
//  });
//
//  it('should render a comment that the user posted by clicking the POST button', async () => {
//    handleSubmit = jest.fn();
//    //const attemptCommentAction = {
//    //  updateComment: jest.fn(),
//    //};
//    //const spy = jest.spyOn(props.attemptCommentAction, 'updateComment');
//    render(<ComponentForm {...props} /*attemptCommentAction={handleSubmit}*/ />);
//    const btn = screen.getByRole('button', { name: /post/i });
//    const textbox = screen.getByRole('textbox');
//
//    userEvent.type(textbox, 'Hello,{enter}World!');
//    expect(textbox).toHaveValue('Hello,\nWorld!');
//
//    //expect(spy).toHaveBeenCalled()
//    userEvent.click(btn);
//    //act(() => {
//    //  btn.click();
//    //});
//
//    await waitFor(() =>
//      expect(handleSubmit).toHaveBeenCalledWith({
//        comment: 'Hello,\nWorld!',
//      })
//    );
//    //expect(handleSubmit).toHaveBeenCalledWith({
//    expect(handleSubmit).toHaveBeenCalledTimes(1);
//  });
})
//const setupComponent = () => {
//  //const handleSubmit = jest.fn();
//  const utils = render(<ComponentForm {...props} />);
//  const btn = screen.getByRole('button', { name: /post/i });
//  const textbox = screen.getByRole('textbox');
//  return {
//    btn,
//    textbox,
//    ...utils,
//  };
//};

