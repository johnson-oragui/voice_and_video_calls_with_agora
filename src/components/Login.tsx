import React, { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
  device_info: Record<string, string>
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: "", password: "", device_info: {} });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    setError("");

    // Send data to backend (replace this with your API call)
    console.log("Logging in with:", formData);
    fetch('https://api.bondyt.com/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({email: formData.email, password: formData.password, device_info: {
        "device_id": "akjfokallkd09u0454l5lkaj095",
        "platform": "ios",
        "device_name": "Galaxy S8",
        "app_version": "1.0.0"
      }
    }),
    }).then((res: Response) => {
      return res.json();
    }).then((data) =>{
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("profile", JSON.stringify(data.data.profile));
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
    }).catch((error) => {
      console.error('Error loggin in user: ', error);
    })
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
