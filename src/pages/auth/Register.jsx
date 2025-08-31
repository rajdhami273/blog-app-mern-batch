import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// components
import { Button, Form } from "react-bootstrap";

// actions
import { login } from "../../redux-app/slices/authSlice";

// utils
import apiClient from "../../utils/apiClient";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  dob: z.coerce.date().min(new Date(1900, 0, 1), {
    message: "Date of birth is required",
  }),
  password: z.string().min(8, {
    message: "Password is required and must be at least 8 characters",
  }),
});

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { errors } = formState;

  function onSubmit(data) {
    apiClient
      .post("/auth/register", data)
      .then((res) => {
        const { token, user } = res.data;
        dispatch(login({ token, user }));
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          {...register("name")}
        />
        <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="dob">
        <Form.Label>Date of birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter date of birth"
          {...register("dob")}
        />
        <Form.Text className="text-danger">{errors.dob?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          {...register("password")}
        />
        <Form.Text className="text-danger">
          {errors.password?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <Form.Text className="text-danger">
          {errors.confirmPassword?.message}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}
