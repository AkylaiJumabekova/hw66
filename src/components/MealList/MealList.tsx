import React from 'react';
import MealItem from '../MealItem/MealItem';
import { MealListProps } from '../../types';

const MealList: React.FC<MealListProps> = ({ meals, onEdit, onDelete }) => {
    return (
        <div>
            {meals.map(meal => (
                <MealItem key={meal.id} meal={meal} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default MealList;
