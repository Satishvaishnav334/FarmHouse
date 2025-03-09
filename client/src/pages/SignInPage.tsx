import { SignedOut, SignIn, useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
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
        <SignIn />
      </SignedOut>
    </div>
  )
}

export default SignInPage