export interface ResponseAdminContentInterface {
    status:  string;
    message: string;
    data:    Data;
}

interface Data {
    only_mobile:   OnlyMobile;
    header:        Header;
    banner:        DataBanner;
    premios:       Premios;
    ranking:       Ranking;
    codigo:        Codigo;
    instrucciones: Instrucciones;
}

interface DataBanner {
    banner:      PortadaClass;
    portada:     PortadaClass;
    video:       string;
    desc:        string;
    label_field: string;
    button:      string;
}

interface PortadaClass {
    imgurl_raw:  string;
    imgurl_webp: string;
    img_alt:     string;
}

interface Codigo {
    title: string;
    desc:  string;
    btn:   string;
    img:   PortadaClass;
}

interface Header {
    logo:  PortadaClass;
    title: PortadaClass;
    icon:  boolean;
}

interface Instrucciones {
    img:   PortadaClass;
    video: string;
    desc:  string;
    act:   string;
    items: ItemAdmincontent[];
}

export interface ItemAdmincontent {
    desc: string;
    img:  PortadaClass;
}

interface OnlyMobile {
    desc:  string;
    bg:    PortadaClass;
    title: PortadaClass;
    qr:    PortadaClass;
    logo:  PortadaClass;
}

interface Premios {
    title: string;
    desc:  string;
    act:   string;
    items: ItemAdmincontent[];
}

interface Ranking {
    title: string;
    desc:  string;
}
