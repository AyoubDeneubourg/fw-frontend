import { Brand } from "./brand";
import { Influencer } from "./influencer";

export type User = {

    id?: number
    active?: string
    address?: string
    birthdate?: string
    email?: string
    firstName?: string
    postalCode: number
    lastName?: string
    country: string
    city?: string
    password?: string
    gender?: any,
    phoneNumber?: number
    profilePicture?: boolean
    rating?: number
    roles?: string
    userName?: string
    userType?: string

};


export type RegistrationData = {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postalCode: number,
    password: string,
    email: string,
    phoneNumber: string
    country: string,
    userName: string,
    birthdate: string,
    userType: 'INFLUENCER' | 'BRAND';
};




export type LoginData = {
    'username': string,
    'password': string,
};




export type Filters = {

/*     socialMedia?: {
        facebook: boolean,
        twitter: boolean,
        instagram: boolean,
        tiktok: boolean,
        snapchat: boolean,
        youtube: boolean,
        telegram: boolean,
    }, */

    socialMedia?: string[]

    type?: {
        posts: boolean,
        stories: boolean,
        highlights: boolean
    },
    notes?: {
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
    age?: number,
    location?: string,
    sectors?: string[]

/*     sector?: {
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
    }, */

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
    'IT',
    'Finance',
    
];


export type Statistics =  {
    influencerId: number,
    topCountries: any,
    topMonths: Object,
    topSocialMedia: Object,

    totalEarningsGraphData: Object,
    totalEarningsMonthGraphData: Object,
    totalEarningsWeekGraphData: Object,
    
    totalMoneyEarned: number,
    totalMoneyEarnedMonth: number,
    totalMoneyEarnedWeek: number,
    
    totalPartnerships: number,
    totalPartnershipsMonth: number
    totalPartnershipsWeek: number
}


export type Profile = User & Influencer & Brand;