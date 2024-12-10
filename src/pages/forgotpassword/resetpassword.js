import { useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

const formSchema = {
  initialValues: {
    password: "",
    OTP: "",
  },
  validationSchema: Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    OTP: Yup.string()
      .required("OTP is required")
      .min(6, "Atleast 6 characters")
      .max(6, "Atleast 6 characters"),
  }),
};

const Form = ({ email }) => {
  const navigate = useNavigate();
  //   const { mutate, isLoading } = useRequestPasswordChangeEmailOtpMutation({
  //     onSuccess: () => handleSuccess("OTP Sent"),
  //     onError: (error) => {
  //       if (error.response && error.response.data) {
  //         const errorData = error.response.data;

  //         if (errorData?.OTP) {
  //           handleSuccess("OTP Already Sent");
  //         } else {
  //           Object.keys(errorData).forEach((field) => {
  //             formik.setFieldError(field, errorData[field].join(", "));
  //           });
  //         }
  //       }
  //     },
  //   });

  const formik = useFormik({
    ...formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      //   mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <p>
        OTP sent to <A>{email}</A>
      </p>
      <Input
        className="mt-4"
        placeholder="New Password"
        type="password"
        autoFocus
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
      )}
      <Input
        className="mt-4"
        placeholder="OTP"
        autoFocus
        {...formik.getFieldProps("OTP")}
      />
      {formik.touched.OTP && formik.errors.OTP && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.OTP}</p>
      )}
      <Button className="mt-6 w-full" type="submit">
        RESET PASSWORD
      </Button>
    </form>
  );
};

const ResetPassword = () => {
  const email = useLocation().state?.email;

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  if (!email) return <Navigate to={ROUTES.FORGOTPASSWORD} />;

  return (
    <div className="w-screen h-screen bg-[#16151A] flex justify-center items-center">
      <div className="border border-[#222227] w-[420px] rounded-xl p-10">
        <div className="flex justify-center items-center flex-col">
          <img src={Logo} alt="logo" className="w-14" />
          <p className="text-center text-white">Reset Password With Email</p>
        </div>
        <Form email={email} />
        <div className="mt-8">
          <p className="text-sm text-center">
            Need any help? <A>Contact Info.</A>
          </p>
          <p className="text-sm text-center my-2">or</p>
          <p className="text-sm text-center">
            <A href={ROUTES.LOGIN}>Try Login?</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
