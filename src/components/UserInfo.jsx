import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/api';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(12); // Remplacez 12 par l'ID utilisateur approprié
                setUserInfo(userData.userInfos);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Bonjour <span>{userInfo.firstName}</span></h2>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
};

export default UserInfo;