import { SignedOut, SignUp, useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/auth/redirect");
    }
  }, [isSignedIn, navigate]);
  return (
    <div>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </div>
  )
}

export default SignUpPage