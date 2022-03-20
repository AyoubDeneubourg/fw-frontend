
export type Offer = {
    orderId?: null | number,
    socialMedia: SocialMedia,
    description: string,
    dates: OfferDates,
    files: OfferFiles,
    isAccepted: OfferStatus,
    client?: OfferClient
}

export type SocialMedia = {

    facebook?: SocialMediaInformation,
    twitter?: SocialMediaInformation,
    instagram?: SocialMediaInformation,
    tiktok?: SocialMediaInformation,
    snapchat?: SocialMediaInformation,
    youtube?: SocialMediaInformation,
    telegram?: SocialMediaInformation,
};

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


export type OfferStatus = 'Accepted' | 'Pending' | 'Candeled'

// Il fais une demande, prix change ??

// New page => Promo code + envoyer quelque chose