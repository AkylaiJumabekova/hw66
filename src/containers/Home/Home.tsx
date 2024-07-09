import React, { useState, useEffect, useCallback } from 'react';
import MealList from '../../components/MealList/MealList';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { Meal } from '../../types';
import { Spinner } from 'react-bootstrap';
import Notification from '../../components/Notification/Notification';

const Home: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchMeals = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi.get('/meals.json');
            const fetchedMeals: Meal[] = [];
            for (let key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                    fetchedMeals.push({
                        ...response.data[key],
                        id: key,
                    });
                }
            }
            setMeals(fetchedMeals);
        } catch (error) {
            setError('Error fetching meals');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchMeals();
    }, [fetchMeals]);

    const handleEdit = (id: string) => {
        navigate(`/meals/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await axiosApi.delete(`/meals/${id}.json`);
            setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
        } catch (error) {
            setError('Error deleting meal');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
    };

    const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

    return (
        <div className="container mt-5">
            {error && <Notification message={error} type="danger" onClose={handleClose} />}
            <h1>Calorie tracker</h1>
            <p>Total calories: {totalCalories} kcal</p>
            {loading ? <Spinner animation="border" /> : <MealList meals={meals} onEdit={handleEdit} onDelete={handleDelete} />}
        </div>
    );
};

export default Home;
