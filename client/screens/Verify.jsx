import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl =
  "https://ir4ovq5ajyh2755u2jnjgj7oqi0bubsp.lambda-url.eu-north-1.on.aws";

function Verify() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token"); // Get token from URL

      try {
        const response = await fetch(
          `${baseUrl}/api/users/verify-email?token=${token}`
        );

        if (response.ok) {
          setMessage("Email successfully verified! Redirecting to login...");
          setTimeout(() => {
            navigate("/signin"); // Redirect to login page after a delay
          }, 3000); // Redirect after 3 seconds
        } else {
          const data = await response.json();
          setMessage(data.error || "Email verification failed.");
        }
      } catch (err) {
        setMessage("Error verifying email.");
        console.error(err);
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}

export default Verify;
