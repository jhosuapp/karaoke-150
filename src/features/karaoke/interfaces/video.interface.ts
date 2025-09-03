export interface PostVideoBodyInterface {
    id:    string;
    merge: Merge[];
}

export interface GetVideoResponseInterface {
    success:  boolean;
    message:  string;
    response: Response;
}

// get video response

interface Response {
    id:         string;
    owner:      string;
    plan:       string;
    status:     "done" | "failed";
    error:      string;
    duration:   number;
    billable:   number;
    renderTime: number;
    url:        string;
    poster:     null;
    thumbnail:  null;
    data:       Data;
    created:    Date;
    updated:    Date;
}

interface Data {
    output:   Output;
    timeline: Timeline;
    merge:    Merge[];
}

interface Merge {
    replace: string;
    find:    string;
}

interface Output {
    format: string;
    fps:    number;
    size:   Size;
}

interface Size {
    width:  number;
    height: number;
}

interface Timeline {
    background: string;
    tracks:     Track[];
}

interface Track {
    clips: Clip[];
}

interface Clip {
    length:    number;
    start:     number;
    position?: string;
    asset:     Asset;
    offset?:   Offset;
}

interface Asset {
    type: string;
    src:  string;
}

interface Offset {
    x: number;
    y: number;
}
