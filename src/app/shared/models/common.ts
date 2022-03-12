export type User = {


};


export type RegistrationData = {
    'accountType': 'Influencer' | 'Brand';
    'country': string,
    'firstName': string,
    'lastName': string,
    'email': string,
    'password': string,
    'phoneNumber': string
};


export type LoginData = {
    'email': string,
    'password': string,
};
