import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Pentamelding Tracker</h1>
            <button onClick={() => navigate('/pentameldCalculator')}>
                Go to Calculator Page
            </button>
        </div>
    );
}

export default HomePage;