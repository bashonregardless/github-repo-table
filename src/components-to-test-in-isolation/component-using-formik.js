import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';

const ComponentForm = ({ onSubmit = () => {} }) => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const [isDisabled, setBtnIsDisabled] = useState(true);
  const validate = (value) => {
    let error;
    if (value) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
    return error;
  };

  const handleSubmit = async (values) => {
    const { comment } = values;
    if (comment) {
      await sleep(500);
      //onSubmit(values);
    }
  };

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          name="comment"
          component="textarea"
          validate={validate}
          placeholder="Add comment here"
        />
        <button
          type="submit"
          disabled={isDisabled}
        >
          Post
        </button>
      </Form>
    </Formik>
  );
};

export default ComponentForm;
