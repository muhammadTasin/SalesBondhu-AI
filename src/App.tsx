import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './navigation/routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;

