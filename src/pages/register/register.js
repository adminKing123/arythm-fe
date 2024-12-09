import { useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import Checkbox from "../../components/checkboxs/checboxs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../../api/accounts/queryHooks";

const formSchema = {
  initialValues: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  },
  validationSchema: Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  }),
};

const Form = () => {
  const { mutate } = useRegisterMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((field) => {
          formik.setFieldError(field, errorData[field].join(", "));
        });
      }
    },
  });

  const formik = useFormik({
    ...formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <div className="flex justify-between gap-4">
        <div>
          <Input
            placeholder="First Name"
            {...formik.getFieldProps("first_name")}
            autoFocus
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.first_name}
            </p>
          )}
        </div>
        <div>
          <Input
            placeholder="Last Name"
            {...formik.getFieldProps("last_name")}
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.last_name}
            </p>
          )}
        </div>
      </div>
      <Input
        className="mt-4"
        placeholder="Username"
        {...formik.getFieldProps("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
      )}
      <Input
        className="mt-4"
        placeholder="Email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
      )}
      <Input
        className="mt-4"
        placeholder="Password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
      )}
      <div className="mt-4 flex items-center">
        <Checkbox
          id="agree-terms-n-conditions"
          {...formik.getFieldProps("agreeTerms")}
          checked={formik.values.agreeTerms}
        />
        <label
          htmlFor="agree-terms-n-conditions"
          className="select-none cursor-pointer text-sm ml-2"
        >
          I agree to the <A>Privacy Policy</A>
        </label>
      </div>
      {formik.touched.agreeTerms && formik.errors.agreeTerms && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.agreeTerms}</p>
      )}

      <Button className="mt-6 w-full" type="submit">
        SIGN UP
      </Button>
    </form>
  );
};

const Register = () => {
  useEffect(() => {
    document.title = "Create Your Account";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#16151A] flex justify-center items-center">
      <div className="border border-[#222227] w-[420px] rounded-xl p-10">
        <div className="flex justify-center items-center flex-col">
          <img src={Logo} alt="logo" className="w-14" />
          <p className="text-center text-white">Sign Up for ARythm</p>
        </div>
        <Form />
        <div className="mt-8">
          <p className="text-sm text-center">
            Already have an account? <A>Sign In!</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
