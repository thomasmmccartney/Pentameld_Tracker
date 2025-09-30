import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculatorPage from './PentameldCalculator';
import ExporterPage from './PentameldExporter';
import HomePage from './Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pentameldCalculator" element={<CalculatorPage />} />
                <Route path="/pentameldExporter" element={<ExporterPage />} />
            </Routes>
        </Router>
    );
}

export default App;