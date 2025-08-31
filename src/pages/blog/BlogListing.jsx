import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";

// components
import { Card } from "react-bootstrap";

// actions
import { setPosts } from "../../redux-app/slices/blogSlice";

// utils
import apiClient from "../../utils/apiClient";
import { stripHtmlAndTruncate } from "../../utils/htmlUtils";

// css
import "./BlogListing.css";

export function BlogListing() {
  const posts = useSelector((state) => state.blog.posts ?? []);

  const dispatch = useDispatch();

  // Helper function to get the full image URL
  const getImageUrl = (imageUrl) => {
    if (imageUrl.startsWith("http") || imageUrl.startsWith("data:")) {
      return imageUrl;
    }
    // For relative paths (uploaded images), prepend the server URL
    return `http://localhost:3000${imageUrl}`;
  };

  useEffect(() => {
    apiClient
      .get("/blogs")
      .then((res) => {
        dispatch(setPosts(res.data.blogs));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row gy-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/blog/${post.id}`}
          className="col-12 col-md-6 col-lg-3 text-decoration-none"
        >
          <Card>
            <Card.Img
              className="cardImage"
              variant="top"
              src={getImageUrl(post.coverImageUrl)}
              alt={post.title}
            />
            <Card.Body>
              <Card.Title className="text-truncate">{post.title}</Card.Title>
              <Card.Text className="text-truncate">
                {stripHtmlAndTruncate(post.description, 100)}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                By {post?.author?.name ?? "Unknown"} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  );
}
