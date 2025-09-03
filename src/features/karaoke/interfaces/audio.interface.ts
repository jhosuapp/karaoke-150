export interface ResponseAudio {
    status: string;
    song:   Song;
}

export interface Song {
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
