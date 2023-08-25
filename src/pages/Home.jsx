import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css'

const Home = () => {
    return (
        <div className="home-page">
            <Container className="content-container">
                <div className="paper">
                    <h1 className="display-4">Home</h1>
                    <p>Welcome to our amazing website!</p>
                </div>
            </Container>
        </div>
    );
};

export default Home;
