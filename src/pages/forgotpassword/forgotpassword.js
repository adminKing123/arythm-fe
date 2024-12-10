import { useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";
import { useRequestPasswordChangeEmailOtpMutation } from "../../api/accounts/queryHooks";

const formSchema = {
  initialValues: {
    email: "",
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
};

const Form = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useRequestPasswordChangeEmailOtpMutation({
    onSuccess: (data) => {
      navigate(ROUTES.HOME);
      alert("OTP Sent");
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
      <Input placeholder="Email" autoFocus {...formik.getFieldProps("email")} />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
      )}
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        SEND OTP
      </Button>
    </form>
  );
};

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#16151A] flex justify-center items-center">
      <div className="border border-[#222227] w-[420px] rounded-xl p-10">
        <div className="flex justify-center items-center flex-col">
          <img src={Logo} alt="logo" className="w-14" />
          <p className="text-center text-white">Reset Password With Email</p>
        </div>
        <Form />
        <div className="mt-8">
          <p className="text-sm text-center">
            Need any help? <A>Contact Info.</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
