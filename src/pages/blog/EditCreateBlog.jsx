import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./ReactQuill.css";

// actions
import { addPost, updatePost } from "../../redux-app/slices/blogSlice";

// utils
import apiClient from "../../utils/apiClient";

// ReactQuill modules and toolbar configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

// Alternative simpler configuration (uncomment to use)
/*
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"]
  ],
};
*/

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
];

// Create schema function to handle edit vs create mode
const createBlogSchema = (isEditMode, hasExistingImage) =>
  z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(100, {
      message: "Description is required and must be at least 100 characters",
    }),
    coverImage:
      isEditMode && hasExistingImage
        ? z.instanceof(FileList).optional()
        : z.instanceof(FileList).refine((files) => files.length > 0, {
            message: "Cover image is required",
          }),
  });

export function EditCreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isEditPage = !!params.blogId;
  const { blogId } = params;

  const post = useSelector((state) =>
    state.blog.posts.find((post) => post.id === blogId)
  );

  const hasExistingImage = isEditPage && post?.coverImageUrl;
  const schema = createBlogSchema(isEditPage, hasExistingImage);

  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: undefined,
    },
  });

  const { errors } = formState;

  async function onSubmit(data) {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Handle cover image
    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }

    try {
      if (isEditPage) {
        const res = await apiClient.patch(`/blogs/${params.blogId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(updatePost(res.data.blog));
        navigate("/");
      } else {
        const res = await apiClient.post(`/blogs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(addPost(res.data.blog));
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    }
  }

  useEffect(() => {
    if (!post && isEditPage) {
      apiClient
        .get(`/blogs/${blogId}`)
        .then((res) => {
          dispatch(addPost(res.data.blog));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [blogId, dispatch, post, isEditPage]);

  // Reset form with post data when post becomes available
  useEffect(() => {
    if (post && isEditPage) {
      reset({
        title: post.title || "",
        description: post.description || "",
        coverImage: undefined, // File input can't be pre-filled for security reasons
      });
    }
  }, [post, isEditPage, reset]);

  if (isEditPage && !post) {
    return <div>Loading...</div>;
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              placeholder="Enter description"
              value={field.value}
              onChange={field.onChange}
              modules={quillModules}
              formats={quillFormats}
            />
          )}
        />
        <Form.Text className="text-danger">
          {errors.description?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="coverImage">
        <Form.Label>Cover image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          placeholder="Upload cover image"
          {...register("coverImage")}
        />
        {isEditPage && post?.coverImageUrl && (
          <Form.Text className="text-muted">
            Current image:{" "}
            {post.coverImageUrl.startsWith("/uploads/")
              ? "Uploaded image"
              : post.coverImageUrl}
          </Form.Text>
        )}
        <Form.Text className="text-danger">
          {errors.coverImage?.message}
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
