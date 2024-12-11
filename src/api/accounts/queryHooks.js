import { useMutation } from "react-query";
import {
  authConfig,
  login,
  register,
  requestPasswordChangeEmailOtp,
  resendEmailOTP,
  resetPasswordWithEmail,
  verifyEmail,
} from "./queryFunctions";
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

export const useRequestPasswordChangeEmailOtpMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => requestPasswordChangeEmailOtp(payload),
    mutationKey: [QUERY_KEYS.REQUEST_PASSWORD_CHANGE_EMAIL_OTP],
    ...config,
  });

export const useResetPasswordWithEmailMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => resetPasswordWithEmail(payload),
    mutationKey: [QUERY_KEYS.RESET_PASSWORD_WITH_EMAIL],
    ...config,
  });

export const useAuthConfigMutation = (config = {}) =>
  useMutation({
    mutationFn: () => authConfig(),
    mutationKey: [QUERY_KEYS.AUTH_CONFIG],
    ...config,
  });
