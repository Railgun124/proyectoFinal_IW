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
    comments?: [{
      user: any; 
      comment: string;
      date: Date;
      stars: number;
    }];
}

export interface Comment{
  user: any; 
  comment: string;
  date: Date;
  stars: number;
}



