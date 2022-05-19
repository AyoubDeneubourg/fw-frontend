
export type Offer = { // add influencer & brand id 
    brandId? : number,
    influencerId? : number,
    orderId?: null | number,
    socialMediaDetails: SocialMediaInformation[],
    description: string,
    startDate: string,
    endDate: string,
    file: OfferFiles,
    status?: OfferStatus, // change to status
    client?: OfferClient
}

export type SocialMedia = {

    facebook?: SocialMediaInformation, // 0 
    twitter?: SocialMediaInformation, // 1
    instagram?: SocialMediaInformation, // ...
    tiktok?: SocialMediaInformation,
    snapchat?: SocialMediaInformation,
    youtube?: SocialMediaInformation,
    telegram?: SocialMediaInformation,
};


export const SocialMediaArray = ['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'TIKTOK', 'SNAPCHAT', 'YOUTUBE', 'TELEGRAM']



export type SocialMediaInformation = {
    name: string,
    stories?: number,
    storyPrice?: number,
    posts?: number,
    postPrice?: number,
    highlights?: number,
    highlightPrice?: number

}

export type OfferDates = {
    startDate: string,
    endDate: string
}

export type OfferFiles = string;

export type OfferClient = {};


export type OfferStatus = 'Accepted' | 'Pending' | 'Cancelled'

// Il fais une demande, prix change ??

// New page => Promo code + envoyer quelque chose