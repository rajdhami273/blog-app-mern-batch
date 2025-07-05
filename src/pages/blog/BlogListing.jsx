import { useSelector } from "react-redux";
import { Link } from "react-router";

// components
import { Card } from "react-bootstrap";

export function BlogListing() {
  const posts = useSelector((state) => state.blog.posts ?? []);
  return (
    <div className="d-flex flex-wrap gap-3 p-3 justify-content-center">
      {posts.map((post) => (
        <Link
          key={post._id}
          to={`/blog/${post._id}`}
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
