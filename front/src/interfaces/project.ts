export interface Project
{
    title: string;
    start_date: Date;
    finish_date: Date;
    budget: number;
    owner: string;
    collaborators: string[];
    products: string[];
    _id: string;
};