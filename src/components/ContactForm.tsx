import { Box, Button, TextField, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { BLACK, WHITE } from '../Style';

const formTheme = createTheme({
  palette: {
    primary: {
      main: BLACK,
    },
    secondary: {
      main: WHITE,
    },
  },
});

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

const FormspreeContact: React.FC<{ formId: string }> = props => {
  const { formId } = props;
  const url = 'https://formspree.io/f/'.concat(formId);
  const [serverState, setServerState] = useState<{ ok: boolean; msg: string }>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const handleServerResponse = (ok: boolean, msg: string) => {
    setServerState({ ok, msg });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Box marginLeft="20px" marginRight="20px">
        <Formik
          initialValues={{ name: '', email: '', telephone: '', message: '' }}
          // validationSchema={FormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            axios({
              method: 'POST',
              url: 'url',
              data: values,
            })
              .then((response: any) => {
                setSubmitting(false);
                resetForm();
                handleServerResponse(true, 'Thanks!');
              })
              .catch((error: { response: { data: { error: any } } }) => {
                setSubmitting(false);
                handleServerResponse(false, error.response.data.error);
              });
          }}
        >
          {({ isSubmitting, dirty, submitForm }) => (
            <Form>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                variant="filled"
                fullWidth={true}
                style={{ marginBottom: '20px' }}
              />
              <br></br>
              <TextField
                id="email"
                name="email"
                label="Email*"
                type="email"
                variant="filled"
                fullWidth={true}
                style={{ marginBottom: '20px' }}
              />
              <br></br>
              <TextField
                id="telephone"
                name="telephone"
                label="Phone"
                type="telephone"
                variant="filled"
                fullWidth={true}
                style={{ marginBottom: '20px' }}
              />
              <ErrorMessage name="email" className="errorMsg" component="p" />
              <TextField
                id="message"
                name="message"
                label="Message*"
                type="message"
                variant="filled"
                multiline
                minRows={5}
                fullWidth={true}
                style={{ marginBottom: '20px' }}
              />
              <br></br>
              <ErrorMessage name="message" className="errorMsg" component="p" />
              <Button
                type="submit"
                disabled={isSubmitting}
                color="secondary"
                variant="contained"
                onClick={submitForm}
              >
                Send
              </Button>
              {serverState && (
                <p className={!serverState.ok ? 'errorMsg' : ''}>{serverState.msg}</p>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default FormspreeContact;
