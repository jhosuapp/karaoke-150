export interface GetResponseAudioInterface {
    status: string;
    song:   Song;
}

export interface PostResponseAudioInterface {
    recognized_text: string;
    score: number;
    coincidences: number;
}

interface Song {
    audio_duration:     number;
    lyrics:             Lyric[];
    challenge_start:    number;
    challenge_end:      number;
    challenge_duration: number;
    audio_file_url:     string;
}

export interface Lyric {
    start:    number;
    end:      number;
    duration: number;
    text:     string;
}
