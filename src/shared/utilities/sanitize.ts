import { ResponseAdminContentInterface } from "../interfaces";
import { cleanHTML } from "./cleanHtml";

export const sanitizeResponse = (response: ResponseAdminContentInterface): ResponseAdminContentInterface => {
    const data = response?.data;
    
    return {
        ...response,
        data: {
            ...data,
            banner: {
                ...data.banner,
                desc: cleanHTML(data.banner.desc),
            },
            only_mobile: {
                ...data.only_mobile,
                desc: cleanHTML(data.only_mobile.desc),
            },
            premios: {
                ...data.premios,
                desc: cleanHTML(data.premios.desc),
                act: cleanHTML(data.premios.act),
                items: data.premios.items.map(item => ({
                    ...item,
                    desc: cleanHTML(item.desc),
                })),
            },
            ranking: {
                ...data.ranking,
                desc: cleanHTML(data.ranking.desc),
            },
        },
    };
}