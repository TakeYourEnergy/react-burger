//Тип для всех ингредиентов
export type TIngredient = {
   calories: number;
   carbohydrates: number;
   fat: number;
   image: string;
   image_large: string;
   image_mobile: string;
   name: string;
   price: number;
   proteins: number;
   type: 'bun' | 'main' | 'sauce';
   __v: number;
   _id: string;
   uuid?: string;

   currentTab?: number | undefined;
   count: number;
   id: string;
};

//тип для регистрации
export type TUser = {
   email: string;
   name: string;
}