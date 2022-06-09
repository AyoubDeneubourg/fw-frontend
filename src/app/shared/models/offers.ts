
export type Offer = { // add influencer & brand id 
    brandId? : number,
    influencerId? : number,
    brandName?: string,
    id?: null | number,
    socialMediaDetails: SocialMediaInformation[],
    description: string,
    startDate: string,
    endDate: string,
    file: any,
    status?: OfferStatus, // change to status
    client?: OfferClient
    finishDate?: any
}




export const SocialMediaArray = ['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'TIKTOK', 'SNAPCHAT', 'YOUTUBE', 'TWITCH']
export const SocialMediaArrayCapitalized = ['Facebook', 'Twitter', 'Instagram', 'Tik-Tok', 'Snapchat', 'YouTube', 'Twitch']
export const socialMediaConverter = {

    'FACEBOOK' : 'Facebook',
    'TWITTER' : 'Twitter',
    'INSTAGRAM' : 'Instagram',
    'TIK-TOK' :'Tik-Tok',
    'TIKTOK' :'Tik-Tok',
    'SNAPCHAT' :'Snapchat',
    'YOUTUBE' :'YouTube',
    'TWITCH' :'Twitch',
}


export type SocialMediaInformation = {
    id?: number,
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


export type OfferClient = {};


export type OfferStatus = 'REQUESTED' | 'DECLINED' | 'DONE' | 'PENDING' | 'IN_PROGRESS'

// Il fais une demande, prix change ??

// New page => Promo code + envoyer quelque chose