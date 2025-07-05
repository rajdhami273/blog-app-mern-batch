import { useSelector } from "react-redux";
import { useParams } from "react-router";

// components
import { Image } from "react-bootstrap";

export function BlogDetails() {
  const { blogId } = useParams();
  const post = useSelector((state) =>
    state.blog.posts.find((post) => post._id === blogId)
  );
  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <Image src={post.coverImageUrl} width={"40%"} alt={post.title} />
      <div className="p-3 text-center w-100">
        <h1>{post.title}</h1>
        <small className="text-muted">
          By John Doe on {new Date(post.createdAt).toLocaleDateString()}
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
        <p>{post.description}</p>
      </div>
    </div>
  );
}
