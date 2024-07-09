import React from 'react';

interface TotalCaloriesProps {
    total: number;
}

const TotalCalories: React.FC<TotalCaloriesProps> = ({ total }) => {
    return <p>Total calories: {total} kcal</p>;
};

export default TotalCalories;