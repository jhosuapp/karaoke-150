export interface ResponseAdminContentInterface {
    status:  string;
    message: string;
    data:    Data;
}

export interface Data {
    only_mobile: OnlyMobile;
    header:      Header;
    banner:      Banner;
    premios:     Premios;
    ranking:     Ranking;
}

export interface Banner {
    portada:     Portada;
    video:       string;
    desc:        string;
    label_field: string;
    button:      string;
}

export interface Portada {
    imgurl_raw:  string;
    imgurl_webp: string;
    img_alt:     string;
}

export interface Header {
    logo:  Portada;
    title: Portada;
    icon:  boolean;
}

export interface OnlyMobile {
    desc:  string;
    bg:    Portada;
    title: Portada;
    qr:    boolean;
    logo:  Portada;
}

export interface Premios {
    title: string;
    desc:  string;
    act:   string;
    items: Item[];
}

export interface Item {
    desc: string;
    img:  Portada;
}

export interface Ranking {
    title: string;
    desc:  string;
}
