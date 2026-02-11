import { useState } from "react";
import { BASE_URL } from "../api/api.js";
import styled from "styled-components";

export const SignUpForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const resJson = await response.json();

      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      handleLogin(resJson.response);
      e.target.reset();
    } catch (error) {
      setError(error.message);
      console.log("An error occurred during signup", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Registrera dig</Title>
      <InputWrapper>
        <Label>
          Name
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
        </Label>
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
      <Button type="submit">Registrera dig</Button>
    </Form>
  );
};

// ======= STYLED COMPONENTS ======= //
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
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
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;