import React, { useEffect, useState } from 'react';
import DataService from '../services/DataService';

const UserInfo = ({ useAPI, userId }) => {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const dataService = new DataService(useAPI);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await dataService.getUserById(userId);
                setUserInfo(userData);
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