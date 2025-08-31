import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// components
import { Navbar, Button, Nav } from "react-bootstrap";

// actions
import { logout } from "../redux-app/slices/authSlice";

// assets
import logo from "../assets/react.svg";

export function Header() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isCreatePage = location.pathname === "/create";
  const isEditPage = location.pathname.includes("/edit");
  const isBlogDetailsPage = location.pathname.includes("/blog");

  const post = useSelector((state) =>
    state.blog.posts.find((post) => post.id === params.blogId)
  );

  const isAuthorized = user?.id === post?.author?.id;

  function handleLogout() {
    dispatch(logout());
    navigate("/auth");
  }
  return (
    <Navbar
      expand={true}
      className="bg-body-tertiary justify-content-between px-2"
    >
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {isBlogDetailsPage && isAuthorized ? (
            <Nav.Link as={Link} to={`/edit/${params.blogId}`}>
              <Button>
                <i className="bi bi-pencil"></i> Edit
              </Button>
            </Nav.Link>
          ) : null}
          {!isCreatePage && !isEditPage && !isBlogDetailsPage ? (
            <Nav.Link as={Link} to={`/create`}>
              <Button>
                <i className="bi bi-plus-lg"></i> Create
              </Button>
            </Nav.Link>
          ) : null}
          {user ? (
            <Nav.Link onClick={handleLogout}>
              <Button variant="outline-danger">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Button>
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
