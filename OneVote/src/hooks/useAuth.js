import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/registeration');
        } else {
            fetchUserData(token);
        }
    }, [navigate]);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/api/protected_view/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data; // Return user data or handle it here
            } else {
                alert('Token Expired.');
                localStorage.removeItem('token');
                navigate('/registeration');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            navigate('/registeration');
        }
    };

    return { fetchUserData }; // Return any functions or state needed externally
};

export default useAuth;
