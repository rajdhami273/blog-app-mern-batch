import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// components
import { Button, Form } from "react-bootstrap";

// actions
import { login } from "../../redux-app/slices/authSlice";

// utils
import apiClient from "../../utils/apiClient";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  password: z.string().min(8, {
    message: "Password is required and must be at least 8 characters",
  }),
});

export function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "email@email.in",
      password: "Password@123",
    },
    resolver: zodResolver(loginSchema),
  });
  const { errors } = formState;

  const navigate = useNavigate();

  function onSubmit(data) {
    apiClient
      .post("/auth/login", data)
      .then((res) => {
        const { token, user } = res.data;
        dispatch(login({ token, user }));
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login to your account</h1>
      <br />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Form.Text className="text-danger">
          {errors.password?.message}
        </Form.Text>
      </Form.Group>
      {error && <p className="text-danger">{error}</p>}
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
