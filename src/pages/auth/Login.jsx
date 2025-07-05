import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// components
import { Button, Form } from "react-bootstrap";

// actions
import { login } from "../../redux-app/slices/authSlice";

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
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { errors } = formState;

  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(
      login({
        _id: "1234123412",
        name: "Ranjoth Ambani",
        email: data.email,
      })
    );
    navigate("/");
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
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
