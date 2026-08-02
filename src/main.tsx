import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Notification from './components/Notification'
import CardDetailModal from './components/CardDetailModal'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import Sell from './pages/Sell'
import About from './pages/About'
import MassEntry from './pages/MassEntry'
import Stores from './pages/Stores'
import Events from './pages/Events'
import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext'
import { ShopProvider } from './context/ShopContext'
import { ProductProvider } from './context/ProductContext'
import { UserProvider } from './context/UserContext'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Notification />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/about" element={<About />} />
                <Route path="/mass-entry" element={<MassEntry />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/events" element={<Events />} />
            </Routes>

            <CardDetailModal />
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NotificationProvider>
            <AuthProvider>
                <UserProvider>
                    <ProductProvider>
                        <ShopProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </ShopProvider>
                    </ProductProvider>
                </UserProvider>
            </AuthProvider>
        </NotificationProvider>
    </StrictMode>,
)
