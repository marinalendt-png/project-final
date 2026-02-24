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
        body: JSON.stringify({
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
      handleLogin(data.response);
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
  padding: 20px;
  width: 100%; 
  background: var(--color-glass);
  border-radius: 12px;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-card);
  margin: 0;
  font-weight: 400;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--color-text-light);
`;

const Input = styled.input`
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  background: var(--color-input-bg);
`;

const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: var(--color-primary);
  color: white;
  margin-top: 10px;
`;

const ErrorText = styled.p`
  color: var(--color-error);
  font-size: 13px;
`;