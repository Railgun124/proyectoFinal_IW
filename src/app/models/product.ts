export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    cellphone: string;
    aproved: boolean;
    salesman?: string;
    comments?: { user: string; comment: string; star: number;}[];
}

