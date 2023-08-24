import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../config/firebase.js";
import {useNavigate} from "react-router-dom";

function BootstrapNavbar() {
    const [user] = useAuthState(auth);
    const expand = "xl";

    const navigate = useNavigate()

    return (
        <>
            <Navbar expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="/">DanielSio</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Home</Nav.Link>
                                {/* Conditional rendering of links based on user authentication */}
                                {user
                                    ? (
                                        <>
                                            <Nav.Link href="/profile">Profile</Nav.Link>
                                            <Nav.Link href="/storage">Storage</Nav.Link>
                                            <Nav.Link
                                                onClick={() => auth.signOut().then(() => navigate("/"))}>Logout</Nav.Link>
                                        </>
                                    )
                                    : (
                                        <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                        </>
                                    )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default BootstrapNavbar;
