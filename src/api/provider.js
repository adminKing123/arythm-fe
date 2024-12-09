import { QueryClient, QueryClientProvider } from "react-query";

const ApiProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
