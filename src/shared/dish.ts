import { Comment } from "./comment";

export interface Dish{
    id:number;
    name:string;
    image:string;
    category:string;
    label:string;
    price:number;
    featured:boolean;
    description:string;
    comments: Comment[];
}