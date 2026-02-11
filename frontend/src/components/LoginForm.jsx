import { useState } from "react";
import { BASE_URL } from "../api/api.js";
import styled from "styled-components";

export const LogInForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stingify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      handleLogin(data.res);
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Logga in</Title>
      <InputWrapper>
        <Label>
          Email
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </Label>
        <Label>
          Password
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Label>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      <Button type="submit">Logga in</Button>
    </Form>
  );
};

// ======= STYLED COMPONENTS ======= //
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;