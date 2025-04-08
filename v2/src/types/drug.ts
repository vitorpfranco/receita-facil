export interface Drug {
    uuid?:string;
    id: number;
    name: string;
    quantity?: string;
    instructions?: string;
    instructions_for_doctors?: string;
    route?: string;
    image_url?: string;
    support_icons?: string;
    is_image?: boolean;
    is_link?: boolean;
    qr_code_url?:string;
    categories_v2?: {
        top_level_group: string,
        subgroup?: string;
    }[]
    icons?: string[];
}