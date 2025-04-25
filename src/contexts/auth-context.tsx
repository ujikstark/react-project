import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import axios from 'axios';
import { request } from '@/common/helpers/request';
import { useNavigate } from "react-router-dom"
import { Toaster } from '@/components/ui/sonner';

type User = {
    id: number;
    name: string;
    email: string;
    // Add more fields if needed
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    fetchUser: () => void;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    // CSRF token + user
    const fetchUser = async () => {
        try {
            await request('GET', 'http://api.ujik.web:8000/sanctum/csrf-cookie');
            const res = await request('GET', 'http://api.ujik.web:8000/api/user');
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await request('POST', 'http://api.ujik.web:8000/logout');
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Redirect if user is logged in and on login/register
    useEffect(() => {
        if (user && ["/login", "/register"].includes(location.pathname)) {
            navigate("/dashboard");
        }

        if (!user && ["/dashboard"].includes(location.pathname)) {
            navigate("/login");
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                Loading...
            </div>
        );
    }


    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, logout, setUser }}>
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};
