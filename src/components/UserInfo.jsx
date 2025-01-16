import React from 'react';
import useFetchData from '../hooks/useFetchData';

const UserInfo = ({ useAPI, userId }) => {
    const { data: userInfo, error } = useFetchData(useAPI, userId, async (dataService, userId) => {
        return await dataService.getUserById(userId);
    });

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