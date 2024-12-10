import { useMutation } from "react-query";
import { login, register, resendEmailOTP, verifyEmail } from "./queryFunctions";
import QUERY_KEYS from "../querykeys";

export const useRegisterMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => register(payload),
    mutationKey: [QUERY_KEYS.REGISTER],
    ...config,
  });

export const useResendEmailOTPMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => resendEmailOTP(payload),
    mutationKey: [QUERY_KEYS.RESEND_EMAIL_OTP],
    ...config,
  });

export const useEmailVerifyMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => verifyEmail(payload),
    mutationKey: [QUERY_KEYS.VERIFY_EMAIL],
    ...config,
  });

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => login(payload),
    mutationKey: [QUERY_KEYS.LOGIN],
    ...config,
  });
