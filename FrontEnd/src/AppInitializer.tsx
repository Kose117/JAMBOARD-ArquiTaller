import React, { useEffect } from 'react';
import { loadUser } from '@/actions/auth/authThunks';

const AppInitializer: React.FC = () => {
    useEffect(() => {
        loadUser();
    }, []);
    return null;
};

export default AppInitializer;
