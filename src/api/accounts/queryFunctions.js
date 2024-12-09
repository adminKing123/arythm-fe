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
