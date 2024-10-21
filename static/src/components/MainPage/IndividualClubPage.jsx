import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const IndividualClubPage = () => {

    const { id } = useParams();
    return (
        <div className="mainContainer">
            {id}
        </div>
    );
}

export default IndividualClubPage