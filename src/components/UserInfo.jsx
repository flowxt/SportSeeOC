import React, { useEffect, useState } from 'react';
import DataService from '../services/DataService';

const UserInfo = ({ useAPI }) => {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const dataService = new DataService(useAPI);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await dataService.getUserById(12); // Remplacez 12 par l'ID utilisateur approprié
                console.log('User data:', userData); // Log pour vérifier les données
                setUserInfo(userData.userInfos);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService]);

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