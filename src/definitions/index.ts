declare namespace interfaces {
  interface UserData {
    id: number;
    userName: string;
    email: string;
    userImage: string;
    password: string;
    admin: number;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    drinks?: object[];
  }

  interface ReviewData {
    id: number;
    userId: number;
    drinkId: number;
    rating: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }

  interface BookmarkDrinks {
    id: number;
    drink: {
      id: number;
      drinkName: string;
      drinkImage: string;
    };
  }
}

export = interfaces;
