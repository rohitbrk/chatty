import { useNavigate } from "react-router-dom";

const useCusNavigate = () => {
  const navigate = useNavigate();
  return navigate;
};

export { useCusNavigate };
