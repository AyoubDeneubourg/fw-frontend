
export type Offer = {
    orderId?: null | number,
    socialMedia: SocialMedia,
    description: string,
    dates: OfferDates,
    files: OfferFiles,
    isAccepted: OfferStatus, // change to status
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


export const SocialMediaArray = ['facebook', 'twitter', 'instagram', 'tiktok', 'snapchat', 'youtube', 'telegram']



export type SocialMediaInformation = {
    posts: number,
    stories: number,
    highlights: number
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