import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }: any) {
  const {token} = useSelector((state:any) => state.auth);
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
