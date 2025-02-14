import api from "..";
import API_ENDPOINTS from "../endpoints";

export const register = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.register,
    data: data,
  });

  return response.data;
};

export const resendEmailOTP = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.RESEND_EMAIL_OTP,
    data: data,
  });

  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.VERIFY_EMAIL,
    data: data,
  });

  return response.data;
};

export const login = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.LOGIN,
    data: data,
  });

  return response.data;
};

export const requestPasswordChangeEmailOtp = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.REQUEST_PASSWORD_CHANGE_EMAIL_OTP,
    data: data,
  });

  return response.data;
};

export const resetPasswordWithEmail = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.RESET_PASSWORD_WITH_EMAIL,
    data: data,
  });

  return response.data;
};

export const authConfig = async () => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.AUTH_CONFIG,
  });

  return response.data;
};
