export type User = {


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
