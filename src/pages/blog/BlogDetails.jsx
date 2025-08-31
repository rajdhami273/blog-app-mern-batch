import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

// components
import { Image } from "react-bootstrap";

// actions
import { addPost } from "../../redux-app/slices/blogSlice";

// utils
import apiClient from "../../utils/apiClient";
import { sanitizeQuillHtml } from "../../utils/sanitizeConfig";

// styles
import "./BlogContent.css";
import "react-quill-new/dist/quill.snow.css";
import "./ReactQuill.css";

export function BlogDetails() {
  const { blogId } = useParams();
  const post = useSelector((state) =>
    state.blog.posts.find((post) => post.id === blogId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!post) {
      apiClient
        .get(`/blogs/${blogId}`)
        .then((res) => {
          dispatch(addPost(res.data.blog));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [blogId, dispatch, post]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Helper function to get the full image URL
  const getImageUrl = (imageUrl) => {
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    // For relative paths (uploaded images), prepend the server URL
    return `http://localhost:3000${imageUrl}`;
  };

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <Image src={getImageUrl(post.coverImageUrl)} width={"40%"} alt={post.title} />
      <div className="p-3 text-center w-100">
        <h1>{post.title}</h1>
        <small className="text-muted">
          By {post?.author?.name} on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </small>
        <hr className="w-100" />
      </div>
      <div
        className="p-3"
        style={{
          textIndent: "50px",
          textAlign: "justify",
        }}
      >
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeQuillHtml(post.description),
          }}
        />
      </div>
    </div>
  );
}
