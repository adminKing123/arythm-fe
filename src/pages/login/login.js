import { useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import Checkbox from "../../components/checkboxs/checboxs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../api/accounts/queryHooks";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

const formSchema = {
  initialValues: {
    username: "",
    password: "",
    remember: false,
  },
  validationSchema: Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    remember: Yup.boolean(),
  }),
};

const Form = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginMutation({
    onSuccess: (data) => {
      const values = formik.values;

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (values.remember) localStorage.setItem("token", data.token);
      else sessionStorage.setItem("token", data.token);

      if (data.__c__) alert(`Welcome ${data.user.username}!`);
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.email) {
          alert(`Please verify email & try login again!`);
          navigate(ROUTES.VERIFYEMAIL, {
            state: {
              email: errorData.email,
            },
          });
        } else {
          Object.keys(errorData).forEach((field) => {
            formik.setFieldError(field, errorData[field].join(", "));
          });
        }
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
      <Input
        placeholder="Username"
        autoFocus
        {...formik.getFieldProps("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
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
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="agree-terms-n-conditions"
            {...formik.getFieldProps("remember")}
            checked={formik.values.remember}
          />
          <label
            htmlFor="agree-terms-n-conditions"
            className="select-none cursor-pointer text-sm ml-2"
          >
            Remember Me
          </label>
        </div>
        <div>
          <A className={"text-sm"} href={ROUTES.FORGOTPASSWORD}>
            Forgot Password?
          </A>
        </div>
      </div>
      {formik.touched.remember && formik.errors.remember && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.remember}</p>
      )}

      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? "PLEASE WAIT..." :"SIGN IN"}
      </Button>
    </form>
  );
};

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#16151A] flex justify-center items-center">
      <div className="border border-[#222227] w-[420px] rounded-xl p-10 m-10">
        <div className="flex justify-center items-center flex-col">
          <img src={Logo} alt="logo" className="w-14" />
          <p className="text-center text-white">Sign In for ARythm</p>
        </div>
        <Form />
        <div className="mt-8">
          <p className="text-sm text-center">
            New to ARythm? <A href={ROUTES.REGISTER}>Sign Up!</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
