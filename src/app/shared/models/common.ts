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
