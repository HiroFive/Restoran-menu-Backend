export interface IFood {
    id?: string;
    name: string;
    description: string;
    hidden: boolean;
    categoryId: string;
    image: string;
    portions: IPortions[];
}

interface IPortions {
    price: number;
    weight: number;
}