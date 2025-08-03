import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import axios from "axios";

// components
import { Card } from "react-bootstrap";

import { setPosts } from "../../redux-app/slices/blogSlice";
import { useEffect } from "react";

export function BlogListing() {
  const posts = useSelector((state) => state.blog.posts ?? []);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/blogs")
      .then((res) => {
        dispatch(setPosts(res.data.blogs));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap gap-3 p-3 justify-content-center">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/blog/${post.id}`}
          className="w-25 text-decoration-none"
        >
          <Card>
            <Card.Img variant="top" src={post.coverImageUrl} alt={post.title} />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="text-truncate">
                {post.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  );
}
