import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { Meal } from '../../types';
import Notification from '../Notification/Notification';

const MealForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<Meal>({
        id: '',
        time: 'Breakfast',
        description: '',
        calories: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchMeal = async () => {
                setLoading(true);
                try {
                    const response = await axiosApi.get(`/meals/${id}.json`);
                    setMeal({ ...response.data, id });
                } catch (error) {
                    setError('Error fetching meal');
                } finally {
                    setLoading(false);
                }
            };
            void fetchMeal();
        }
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMeal(prevState => ({
            ...prevState,
            [name]: name === 'calories' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (id) {
                await axiosApi.put(`/meals/${id}.json`, meal);
                setSuccess('Meal updated successfully');
            } else {
                await axiosApi.post('/meals.json', meal);
                setSuccess('Meal created successfully');
                navigate('/');
            }
        } catch (error) {
            setError('Error submitting meal');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        setSuccess(null);
    };

    return (
        <>
            {error && <Notification message={error} type="danger" onClose={handleClose} />}
            {success && <Notification message={success} type="success" onClose={handleClose} />}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <select id="time" name="time" value={meal.time} onChange={handleChange} className="form-select">
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snack">Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Meal Description</label>
                    <textarea id="description" name="description" value={meal.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories</label>
                    <input type="number" id="calories" name="calories" value={meal.calories} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </>
    );
};

export default MealForm;
