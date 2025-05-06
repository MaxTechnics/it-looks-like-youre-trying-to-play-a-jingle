// Actions can start jingles, but can also manage jingle lifetime.
// Jingles are started and stopped by actions, it also allows jingles to be faded in, or out
import { fadeOutEffect, fadeOutTapijtje, playEffect, playIdent, playTapijtje, stopIdent, stopTapijtje } from '../player';

interface JukeBoxAction {
    name: string;
    id: string;
    exec: () => void;
}

const d = (dur: number) => new Promise(r => setTimeout(r, dur));

export const actions: { [group: string]: { [action_id: string]: JukeBoxAction } } = {
    'Journaal 2013 MXM': {
        // clock -> uitsmijter
        'jn_mxm_counter': {
            name: 'Counter',
            id: 'jn_mxm_counter',
            exec: () => {
                playTapijtje('jn_mxm_counter');
            }
        },
        'jn_mxm_start': {
            name: 'Start',
            id: 'jn_mxm_start',
            exec: () => {
                playTapijtje('jn_mxm_start');
                stopTapijtje('jn_mxm_counter');
            }
        },

        'jn_mxm_hl1': {
            name: 'Headline 1',
            id: 'jn_mxm_hl1',
            exec: () => {
                playTapijtje('jn_2013_j19_hl1');
                stopTapijtje('jn_mxm_start');
            }
        },
        'jn_2013_j19_hl234': {
            name: 'Headline 234',
            id: 'jn_2013_j19_hl234',
            exec: () => {
                stopTapijtje('jn_mxm_start');
                playTapijtje('jn_2013_j19_hl_234')
                stopTapijtje('jn_2013_j19_hl1');
            }
        },
        'jn_2013_j19_hl_switch': {
            name: 'Headline switch',
            id: 'jn_2013_j19_hl_switch',
            exec: () => {
                playEffect('jn_2013_hl_jingle');
            }
        },
        'jn_2013_j19_apotheose': {
            name: 'Intro',
            id: 'jn_2013_j19_apotheose',
            exec: () => {
                playIdent('jn_2013_hl_apotheose')
                stopTapijtje('jn_mxm_counter');
                stopTapijtje('jn_2013_j19_hl1');
                stopTapijtje('jn_2013_j19_hl_234');
            }
        }
    },
    'Journaal 2013 J13': {
        // goto sport J_OVER_NAAR_SPORT
        // back to news J_IDENT_LOGO
        /// eindtapijt J_VRTNIEUWSLIVE of weer // is zelfde tapijt, weer == live ingekrot
        // eind J_EIND_HL_TAPIJT
        // J_COPYRIGHT
        'jn_2013_opener': {
            name: 'Start Journaal',
            id: 'jn_2013_opener',
            exec: () => {
                playIdent('jn_2013_begin_aftel_apotheose');
            }
        },
        'jn_2013_ident_logo': {
            name: 'Ident Logo', // topic change
            id: 'jn_2013_ident_logo',
            exec: () => {
                playEffect('jn_2013_ident_logo');
            }
        },
        'jn_2013_ident_title': {
            name: 'Ident Title', // topic change
            id: 'jn_2013_ident_title',
            exec: () => {
                playEffect('jn_2013_ident_titel');
            }
        },
        'jn_2013_video_start': {
            name: 'Video/straksfie',
            id: 'jn_2013_video_start',
            exec: () => {
                playTapijtje('jn_2013_ident_video');
            }
        },
        'jn_2013_video_end': {
            name: 'Video End',
            id: 'jn_2013_video_end',
            exec: () => {
                playEffect('jn_2013_ident_video_eind');
                stopTapijtje('jn_2013_ident_video');
            }
        },
        'jn_2013_sport': {
            name: 'Trans Sport',
            id: 'jn_2013_sport',
            exec: () => {
                playIdent('jn_2013_over_naar_sport');
            }
        },
        // back to news: J_IDENT_LOGO
        'jn_2013_weer': {
            name: 'Weer',
            id: 'jn_2013_weer',
            exec: () => {
                playTapijtje('jn_2013_weer_tapijt');
            }
        },
        'jn_2013_eind': {
            name: 'Eind',
            id: 'jn_2013_eind',
            exec: () => {
                playTapijtje('jn_2013_eind_hl_tapijt');
                stopTapijtje('jn_2013_weer_tapijt');
            }
        },
        'jn_2013_copyright': {
            name: 'Copyright',
            id: 'jn_2013_copyright',
            exec: () => {
                playIdent('jn_2013_copyright');
                stopTapijtje('jn_2013_eind_hl_tapijt');
            }
        }


    },
    'Journaal 2013 J19': {
        // clock -> uitsmijter
        'jn_2013_j19_opener': {
            name: 'Start Journaal 7',
            id: 'jn_2013_j19_opener',
            exec: () => {
                playIdent('jn_2013_j19_begin');
            }
        },
        'jn_2013_j19_hl1': {
            name: 'Headline 1',
            id: 'jn_2013_j19_hl1',
            exec: () => {
                playTapijtje('jn_2013_j19_hl1');
                stopIdent('jn_2013_j19_begin');
            }
        },
        'jn_2013_j19_hl234': {
            name: 'Headline 234',
            id: 'jn_2013_j19_hl234',
            exec: () => {
                stopIdent('jn_2013_j19_begin');
                playTapijtje('jn_2013_j19_hl_234')
                stopTapijtje('jn_2013_j19_hl1');
            }
        },
        'jn_2013_j19_hl_switch': {
            name: 'Headline switch',
            id: 'jn_2013_j19_hl_switch',
            exec: () => {
                playEffect('jn_2013_hl_jingle');
            }
        },
        'jn_2013_j19_apotheose': {
            name: 'Intro',
            id: 'jn_2013_j19_apotheose',
            exec: () => {
                playIdent('jn_2013_hl_apotheose')
                stopTapijtje('jn_2013_j19_hl1');
                stopTapijtje('jn_2013_j19_hl_234');
            }
        }
    },
    'Journaal 2016': {
        'jn_2016_opener': {
            name: 'Start Journaal',
            id: 'jn_2016_opener',
            exec: () => {
                playTapijtje('jn_2016_opener');
            }
        },
        'jn_2016_wipe_1': {
            name: 'Wipe 1',
            id: 'jn_2016_wipe_1',
            exec: () => {
                playEffect('jn_2016_wipe1');
            }
        },
        'jn_2016_wipe_2': {
            name: 'Wipe 2',
            id: 'jn_2016_wipe_2',
            exec: () => {
                playEffect('jn_2016_wipe2');
            }
        },
        'jn_2016_wipe_3': {
            name: 'Wipe 3',
            id: 'jn_2016_wipe_3',
            exec: () => {
                playEffect('jn_2016_wipe3');
            }
        },
        'jn_2016_wipe_4': {
            name: 'Wipe 4',
            id: 'jn_2016_wipe_4',
            exec: () => {
                playEffect('jn_2016_wipe4');
            }
        },
        'jn_2016_intro_long': {
            name: 'Intro Long',
            id: 'jn_2016_intro_long',
            exec: () => {
                fadeOutTapijtje('jn_2016_opener', 300);
                playIdent('jn_2016_intro_long');
            }
        },
        'jn_2016_intro_short': {
            name: 'Intro Short',
            id: 'jn_2016_intro_short',
            exec: () => {
                fadeOutTapijtje('jn_2016_opener', 300);
                playIdent('jn_2016_intro_short');
            }
        },
        'jn_2016_start_video': {
            name: 'Video Start',
            id: 'jn_2016_start_video',
            exec: () => {
                playEffect('jn_2016_id_logo');
                playTapijtje('jn_2016_id_video');
            }
        },
        'jn_2016_stop_video': {
            name: 'Video Stop',
            id: 'jn_2016_stop_video',
            exec: () => {
                playEffect('jn_2016_bumper');
                stopTapijtje('jn_2016_id_video');
            }
        },
        'jn_2016_start_straks': {
            name: 'Straks Start',
            id: 'jn_2016_start_straks',
            exec: () => {
                playTapijtje('jn_2016_straks1');
            }
        },
        'jn_2016_stop_straks': {
            name: 'Straks Stop',
            id: 'jn_2016_start_straks',
            exec: () => {
                fadeOutTapijtje('jn_2016_straks1', 300);
                playEffect('jn_2016_bumper');
            }
        },
        'jn_2016_weather': {
            name: 'Weer / Pre-eind',
            id: 'jn_2016_weather',
            exec: () => {
                playTapijtje('jn_2016_weer');
            }
        },
        'jn_2016_end': {
            name: 'Eind',
            id: 'jn_2016_end',
            exec: () => {
                playEffect('jn_2016_wipe1');
                playTapijtje('jn_2016_eind');
                fadeOutTapijtje('jn_2016_weer', 300);
            }
        },
        'jn_2016_outro': {
            name: 'Outro',
            id: 'jn_2016_outro',
            exec: () => {
                fadeOutTapijtje('jn_2016_eind', 300);
                playIdent('jn_2016_outro');
            }
        }
    },
    'Terzake 2024': {
        'tz_2024_clock': {
            name: 'Start Clock',
            id: 'tz_2024_clock',
            exec: async () => {
                await d(650);
                playTapijtje('tz_2024_clock');
            }
        },
        'tz_2024_headlines': {
            name: 'Headlines',
            id: 'tz_2024_headlines',
            exec: () => {
                playTapijtje('tz_2024_headlines');
                stopTapijtje('tz_2024_clock');
            }
        },
        'tz_2024_topic': {
            name: 'Topic',
            id: 'tz_2024_topic',
            exec: () => {
                playEffect('tz_2024_topic_separator')
            }
        },
        'tz_2024_intro': {
            name: 'Intro',
            id: 'tz_2024_intro',
            exec: () => {
                playIdent('tz_2024_begingeneriek')
                fadeOutTapijtje('tz_2024_headlines', 100);
            }
        },
        'tz_2024_bumper_topic': {
            name: 'Bumper Topic',
            id: 'tz_2024_bumper_topic',
            exec: () => {
                playEffect('tz_2024_bumper_topic');
            }
        },
        'tz_2024_bumper_simple': {
            name: 'Bumper Simple',
            id: 'tz_2024_bumper_simple',
            exec: () => {
                playEffect('tz_2024_bumper');
            }
        },
        'tz_2024_bumper_soft': {
            name: 'Bumper Soft',
            id: 'tz_2024_bumper_soft',
            exec: () => {
                playEffect('tz_2024_bumper_soft');
            }
        },
        'tz_2024_moodchange': {
            name: 'Mood change',
            id: 'tz_2024_moodchange',
            exec: () => {
                playEffect('tz_2024_moodchange');
            }
        },
        'tz_2024_end': {
            name: 'Bedanking',
            id: 'tz_2024_end',
            exec: () => {
                playTapijtje('tz_2024_eindtapijt');
            }
        },
        'tz_2024_outro': {
            name: 'Outro',
            id: 'tz_2024_outro',
            exec: () => {
                playIdent('tz_2024_ending_credits');
                fadeOutTapijtje('tz_2024_eindtapijt', 100);
            }
        }
    },
    'De afspraak 2024': {
        'df_2024_opener': {
            name: 'Start',
            id: 'df_2024_opener',
            exec: async () => {
                playIdent('df_2024_beginbumper');
                await d(5200);
                playTapijtje('df_2024_bedanking');
            }
        },
        'df_2024_intro': {
            name: 'Intro',
            id: 'df_2024_intro',
            exec: async () => {
                playIdent('df_2024_begingeneriek');
                fadeOutTapijtje('df_2024_bedanking', 300);
            }
        },
        'df_2024_bumper_a': {
            name: 'Bumper A',
            id: 'df_2024_bumper_a',
            exec: async () => {
                playEffect('df_2024_bumper_a');
            }
        },
        'df_2024_bumper_b': {
            name: 'Bumper B',
            id: 'df_2024_bumper_b',
            exec: async () => {
                playEffect('df_2024_bumper_b');
            }
        },
        'df_2024_bedanking': {
            name: 'Bednaking',
            id: 'df_2024_bedanking',
            exec: async () => {
                playTapijtje('df_2024_bedanking');
            }
        },
        'df_2024_outro': {
            name: 'Outro',
            id: 'df_2024_outro',
            exec: async () => {
                playIdent('df_2024_eindgeneriek');
                fadeOutTapijtje('df_2024_bedanking', 300);
            }
        }
    },
    'De Zevende Dag 2024': {
        'd7_2024_hl': {
            name: 'Headlines',
            id: 'd7_2024_hl',
            exec: async () => {
                playTapijtje('d7_2024_headlines');
            }
        },
        'd7_2024_topic': {
            name: 'Topic Separator',
            id: 'd7_2024_topic',
            exec: async () => {
                playEffect('d7_2024_topic_separator');
            }
        },
        'd7_2024_intro': {
            name: 'Begingeneriek',
            id: 'd7_2024_intro',
            exec: async () => {
                fadeOutTapijtje('d7_2024_headlines', 300);
                playIdent('d7_2024_begingeneriek');
            }
        },
        'd7_2024_bumper_menu': {
            name: 'Bumper Menu',
            id: 'd7_2024_bumper_menu',
            exec: async () => {
                playEffect('d7_2024_bumper_menu');
            }
        },
        'd7_2024_bumper_music': {
            name: 'Bumper Muziek',
            id: 'd7_2024_bumper_music',
            exec: async () => {
                playEffect('d7_2024_bumper_muziek');
            }
        },
        'd7_2024_bumper_studio': {
            name: 'Bumper Studio',
            id: 'd7_2024_bumper_studio',
            exec: async () => {
                playEffect('d7_2024_bumper_studio');
            }
        },
        'd7_2024_bumper_titel': {
            name: 'Bumper Titel',
            id: 'd7_2024_bumper_titel',
            exec: async () => {
                playEffect('d7_2024_bumper_titel');
            }
        },
        'd7_2024_accent_1': {
            name: 'Accent 1',
            id: 'd7_2024_accent_1',
            exec: async () => {
                playEffect('d7_2024_accent_1');
            }
        },
        'd7_2024_accent_2': {
            name: 'Accent 2',
            id: 'd7_2024_accent_2',
            exec: async () => {
                playEffect('d7_2024_accent_2');
            }
        },
        'd7_2024_bedanking': {
            name: 'Bedanking',
            id: 'd7_2024_bedanking',
            exec: async () => {
                playTapijtje('d7_2024_bedanking');
            }
        },
        'd7_2024_outro': {
            name: 'Eindgeneriek',
            id: 'd7_2024_outro',
            exec: async () => {
                playIdent('d7_2024_eindgeneriek');
                fadeOutTapijtje('d7_2024_bedanking', 300);
            }
        },


        // const d7djingles: Jingle[] = [


        //     {
        //         name: 'Headlines Lite',
        //         id: 'd7_2024_headlines_lite',
        //         program: 'De_zevende_dag_2024',
        //         type: JingleType.Tapijtje,
        //         file: D7_2024_HEADLINES_LITE,
        //         loops: false
        //     },
        //     {
        //         name: 'Headlines Lite 2',
        //         id: 'd7_2024_headlines_lite_2',
        //         program: 'De_zevende_dag_2024',
        //         type: JingleType.Tapijtje,
        //         file: D7_2024_HEADLINES_LITE_2,
        //         loops: false
        //     },
        //     {
        //         name: 'Headlines Lite 3',
        //         id: 'd7_2024_headlines_lite_3',
        //         program: 'De_zevende_dag_2024',
        //         type: JingleType.Tapijtje,
        //         file: D7_2024_HEADLINES_LITE_3,
        //         loops: false
        //     },
        //     {
        //         name: 'Straksfie',
        //         id: 'd7_2024_straksfie',
        //         program: 'De_zevende_dag_2024',
        //         type: JingleType.Tapijtje,
        //         file: D7_2024_STRAKSFIE,
        //         loops: false
        //     },

        // ]

    }

};

const actionLookup: { [id: string]: JukeBoxAction } = {};

Object.values(actions).forEach(group => {
    Object.values(group).forEach(action => {
        actionLookup[action.id] = action;
    });
});

export const run_action_by_id = (action_id: string) => {
    const action = actionLookup[action_id];
    if (action) {
        action.exec();
    } else {
        console.error(`Action ${action_id} not found`);
    }
}
