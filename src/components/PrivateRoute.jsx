import {Navigate, Outlet} from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus.jsx';
import {ClipLoader} from 'react-spinners';

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus();

    if (checkingStatus) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Adjust the height as needed
                }}
            >
                <ClipLoader className="spinner" color="#29335c" loading={checkingStatus} size={100}/>
            </div>
        );
    }

    return loggedIn ? <Outlet/> : <Navigate to="/login"/>;
};

export default PrivateRoute;
