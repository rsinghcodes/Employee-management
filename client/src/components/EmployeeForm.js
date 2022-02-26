import React from 'react';
import * as Yup from 'yup';
import 'yup-phone';
import moment from 'moment';
import uniqueRandom from 'unique-random';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const random = uniqueRandom(10000, 100000);

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),
    lastname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name is required'),
    mobile: Yup.string()
      .phone('IN', false, 'Enter Indian valid phone number')
      .required(),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    dob: Yup.string().test(
      'DOB',
      'Please choose a valid date of birth in MM/DD/YYYY and must be 18+',
      (value) => moment().diff(moment(value), 'years') >= 18
    ),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
  });

  const formik = useFormik({
    initialValues: {
      empId: random(),
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      dob: '',
      mobile: '',
      city: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {},
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First name"
                {...getFieldProps('firstname')}
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
              <TextField
                fullWidth
                label="Last name"
                {...getFieldProps('lastname')}
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Stack>
            <TextField
              fullWidth
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Mobile"
              {...getFieldProps('mobile')}
              error={Boolean(touched.mobile && errors.mobile)}
              helperText={touched.mobile && errors.mobile}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              {...getFieldProps('dob')}
              error={Boolean(touched.dob && errors.dob)}
              helperText={touched.dob && errors.dob}
            />
            <TextField
              fullWidth
              label="Address"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
            <TextField
              fullWidth
              label="City"
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disableElevation
            >
              Save Employee
            </LoadingButton>
          </Stack>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
