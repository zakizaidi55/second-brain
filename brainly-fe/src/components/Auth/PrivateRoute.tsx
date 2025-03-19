import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function PrivateRoute({ children }: any) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  if (token) {
    return <div>{children}</div>;
  }

  return null;
}
