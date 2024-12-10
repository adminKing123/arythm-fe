import { useEffect, useState } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useEmailVerifyMutation,
  useResendEmailOTPMutation,
} from "../../api/accounts/queryHooks";
import ROUTES from "../../router/routes";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ResendOTP = ({ email, formik }) => {
  const { mutate, isLoading } = useResendEmailOTPMutation({
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((field) => {
          formik.setFieldError(field, errorData[field].join(", "));
        });
      }
    },
  });
  const DURATION = 2;
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    } else {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (isResendEnabled) {
      setIsResendEnabled(false);
      setTimeLeft(DURATION);
      mutate({
        email: email,
      });
    }
  };

  return (
    <p
      onClick={handleResend}
      className={
        "mt-1 text-sm cursor-pointer select-none text-[#25a564] hover:underline"
      }
    >
      {isLoading
        ? "Sending OTP..."
        : isResendEnabled
        ? "Resend OTP"
        : `Wait ${timeLeft} to resend OTP!`}
    </p>
  );
};

const formSchema = {
  initialValues: {
    OTP: "",
  },
  validationSchema: Yup.object({
    OTP: Yup.string()
      .required("OTP is required")
      .min(6, "Atleast 6 characters")
      .max(6, "Atleast 6 characters"),
  }),
};

const Form = ({ email }) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useEmailVerifyMutation({
    onSuccess: (data) => {
      alert("Email Verified, you can login now!");
      navigate(ROUTES.LOGIN);
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
      mutate({
        email: email,
        OTP: values.OTP,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <p>
        OTP sent to <A>{email}</A>
      </p>
      <Input
        className="mt-4"
        placeholder="OTP"
        autoFocus
        {...formik.getFieldProps("OTP")}
      />
      {formik.touched.OTP && formik.errors.OTP && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.OTP}</p>
      )}
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        SIGN UP
      </Button>

      <ResendOTP email={email} formik={formik} />
    </form>
  );
};

const VerifyEmail = () => {
  const email = useLocation().state?.email;

  useEffect(() => {
    document.title = "Verify Email";
  }, []);

  if (!email) return <Navigate to={ROUTES.REGISTER} />;

  return (
    <div className="w-screen h-screen bg-[#16151A] flex justify-center items-center">
      <div className="border border-[#222227] w-[420px] rounded-xl p-10">
        <div className="flex justify-center items-center flex-col">
          <img src={Logo} alt="logo" className="w-14" />
          <p className="text-center text-white">Verify Email</p>
        </div>
        <Form email={email} />
        <div className="mt-8">
          <p className="text-sm text-center">
            Wrong email entered? <A href={ROUTES.REGISTER}>Sign Up Again!</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
