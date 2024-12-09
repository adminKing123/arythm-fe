import { useMutation } from "react-query";
import { register } from "./queryFunctions";
import QUERY_KEYS from "../querykeys";

export const useRegisterMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => register(payload),
    mutationKey: [QUERY_KEYS.REGISTER],
    ...config,
  });
