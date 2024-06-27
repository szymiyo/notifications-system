import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './components/NotificationCtx.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
)
