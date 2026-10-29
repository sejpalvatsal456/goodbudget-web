import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login.tsx'
import { AuthProvider } from './components/AuthContext.tsx'
import { AccountPage } from './Account.tsx'
import TransactionPage from './Transaction.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path='/accounts' element={<AccountPage />} />
        <Route path='/transactions' element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
