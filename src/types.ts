export interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

export interface MealProps {
    meal: Meal;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface MealListProps {
    meals: Meal[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}
