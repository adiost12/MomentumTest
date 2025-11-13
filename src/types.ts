export type Discount = {
    discountFunction: (price: number) => number;
    name: string;
};

export type Plan = {
    id: number;
    name: string;
    price: number;
    numberOfDays: number;
    isMostPopular?: boolean;
};