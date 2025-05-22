import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're exactly at the root path
    if (location.pathname === "/") {
      navigate("/community");
    }
  }, [navigate, location.pathname]);

  return null;
};

export default Index;