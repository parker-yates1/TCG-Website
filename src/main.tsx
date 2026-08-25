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
import Welcome from './pages/Welcome'
import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext'
import { ShopProvider } from './context/ShopContext'
import { ProductProvider } from './context/ProductContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import { OnboardingProvider } from './context/OnboardingContext'

function App() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
            <Header />
            <Notification />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
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
        <ThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <UserProvider>
                        <OnboardingProvider>
                            <ProductProvider>
                                <ShopProvider>
                                    <BrowserRouter>
                                        <App />
                                    </BrowserRouter>
                                </ShopProvider>
                            </ProductProvider>
                        </OnboardingProvider>
                    </UserProvider>
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    </StrictMode>,
)
