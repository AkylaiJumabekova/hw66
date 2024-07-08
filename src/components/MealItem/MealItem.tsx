import React from 'react';
import { MealProps } from '../../types';

const MealItem: React.FC<MealProps> = ({ meal, onEdit, onDelete }) => {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{meal.time}</h5>
                <p className="card-text">{meal.description}</p>
                <p className="card-text">{meal.calories} kcal</p>
                <button className="btn btn-primary" onClick={() => onEdit(meal.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(meal.id)}>Delete</button>
            </div>
        </div>
    );
};

export default MealItem;
