export type User = {

    id?: number
    active?: string
    address?: string
    birthdate?: string
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    phoneNumber?: number
    profilePicture?: string
    rating?: number
    roles?: string
    userName?: string
    userType?: string

};


export type RegistrationData = {
    'firstName': string,
    'lastName': string,
    //  'userName': string,
    'password': string,
    'email': string,
    'phoneNumber': string
    'country': string,
    'accountType': 'Influencer' | 'Brand';
};




export type LoginData = {
    'username': string,
    'password': string,
};




export type Filters = {

    socialMedia?: {
        facebook: boolean,
        twitter: boolean,
        instagram: boolean,
        tiktok: boolean,
        snapchat: boolean,
        youtube: boolean,
        telegram: boolean,
    },
    type?: {
        posts: boolean,
        stories: boolean,
        highlights: boolean
    },
    notes: {
        '1': boolean,
        '2': boolean,
        '3': boolean,
        '4': boolean,
        '5': boolean,
    },

    budget?: {
        min: number,
        max: number,
    },

    followers?: {
        min: number,
        max: number,
    },
    views?: {
        min: number,
        max: number,
    },


    gender?: 'Both' | 'Male' | 'Female',

    sector?: {
        automotive: boolean,
        lifestyle: boolean,
        science: boolean,
        music: boolean,
        petsAndAnimals: boolean,
        sports: boolean,
        gymAndFitness: boolean,
        gaming: boolean,
        foodAndDrink: boolean,
        fashion: boolean,
        travel: boolean,
        beauty: boolean,
        art: boolean,
    },

    location?: string
}

export const sectors = [
    'Automotive',
    'Lifestyle',
    'Science',
    'Music',
    'Pets and Animals',
    'Sports',
    'Gym and Fitness',
    'Gaming',
    'Food and Drink',
    'Fashion',
    'Travel',
    'Beauty',
    'Art',
];


