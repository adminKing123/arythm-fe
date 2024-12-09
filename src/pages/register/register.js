import { useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import Input from "../../components/Inputs/inputs";
import Checkbox from "../../components/checkboxs/checboxs";
import A from "../../components/links/links";
import Button from "../../components/buttons/buttons";

const Form = () => {
  return (
    <form className="mt-8">
      <div className="flex justify-between gap-4">
        <div>
          <Input placeholder="First Name" autoFocus />
        </div>
        <div>
          <Input placeholder="Last Name" />
        </div>
      </div>
      <Input className={"mt-4"} placeholder="Username" autofill={"false"} />
      <Input className={"mt-4"} placeholder="Email" autofill={"false"} />
      <Input
        className={"mt-4"}
        placeholder="Password"
        type="password"
        autofill={"false"}
      />
      <div className="mt-4 flex items-center">
        <Checkbox id="agree-terms-n-conditions" />
        <label
          htmlFor="agree-terms-n-conditions"
          className="select-none cursor-pointer text-sm ml-2"
        >
          I agree to the <A>Privacy Policy</A>
        </label>
      </div>

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
