import React from "react";
import Navigator from "../components/Navigator";

const baseUrl = "https://5c6prkkgx4.execute-api.eu-north-1.amazonaws.com/prod";

function Settings() {
  const deleteAccount = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/users/delete-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      });

      if (response.status === 200) {
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={deleteAccount}>Delete Account</button>
      <Navigator />
    </div>
  );
}

export default Settings;
