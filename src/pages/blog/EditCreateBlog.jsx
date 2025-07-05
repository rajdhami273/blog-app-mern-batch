import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

// actions
import { addPost, updatePost } from "../../redux-app/slices/blogSlice";

// schema
const blogSceham = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(100, {
    message: "Description is required and must be at least 100 characters",
  }),
  coverImageUrl: z.string().min(1, { message: "Image url is required" }),
});

export function EditCreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isEditPage = !!params.blogId;

  const post = useSelector((state) =>
    state.blog.posts.find((post) => post._id === params.blogId)
  );

  console.log(post);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(blogSceham),
    defaultValues: isEditPage
      ? post
      : {
          title: "",
          description: "",
          coverImageUrl: "",
        },
  });

  const { errors } = formState;

  function onSubmit(data) {
    const newPost = {
      ...data,
      _id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      authorId: "1234123412",
      isPublished: true,
    };
    if (isEditPage) {
      dispatch(updatePost({ ...newPost, _id: params.blogId }));
    } else {
      dispatch(addPost(newPost));
    }
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          {...register("title")}
        />
        <Form.Text className="text-danger">{errors.title?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          {...register("description")}
        />
        <Form.Text className="text-danger">
          {errors.description?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Image url</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image url"
          {...register("coverImageUrl")}
        />
        <Form.Text className="text-danger">
          {errors.coverImageUrl?.message}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

/**
 * 1. Create a form (can use any library)
 * 2. install react-hook-form and zod/Yup and @hookform/resolvers
 * 3. Create a schema for the form using zod, Yup, etc.
 * 4. Use react-hook-form to create the form (sample: useForm({resolver: zodResolver(schema)}))
 * 5. Use the useForm hook to get the form state, errors, handleSubmit and register
 * 6. Use register to register the form fields (sample: {...register("<your_field_name>")})
 * 7. Use formState to get the errors (sample: {errors.<your_field_name>?.message})
 * 8. Use handleSubmit to handle the form submission and pass your onSubmit function
 */
