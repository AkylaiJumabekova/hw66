import React, { useState } from 'react';
import { MealProps } from '../../types';
import { Spinner } from 'react-bootstrap';

const MealItem: React.FC<MealProps> = ({ meal, onEdit, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete(meal.id);
        } catch (error) {
            console.error('Error deleting meal:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{meal.time}</h5>
                <p className="card-text">{meal.description}</p>
                <p className="card-text">{meal.calories} kcal</p>
                <button className="btn btn-primary" onClick={() => onEdit(meal.id)}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default MealItem;
