<template>
    <Error v-if="isError !== ''">{{ isError }}</Error>
    <main v-else class="window" style="box-sizing: border-box; height: 100%;">
        <div class="cont" v-if="!hasLoaded">
            <div class="title-bar" style="-webkit-app-region: drag">
                <div class="title-bar-text">The fucking app loads</div>
            </div>
            <div class="window-body windowcontent">
                <LoadingView @load="hasLoaded = true" />
            </div>
            <div class="status-bar status" style="align-self: flex-end;">
                <p class="status-bar-field">System starting</p>
                <p class="status-bar-field">TBAow</p>
                <p class="status-bar-field">{{ time }}</p>
            </div>
        </div>

        <div class="cont" v-else>
            <div class="title-bar" style="-webkit-app-region: drag;">
                <div class="title-bar-text">The fucking app</div>
            </div>
            <div class="window-body windowcontent">
                <h1><i>The jukebox</i></h1>
                <p>This shit is like so ass<br />Elk zunnen dah<br />ik ben herrit callewaert uit bavikhove deelhemeente van oarelbeke.</p>
                <div>
                    <menu role="tablist">
                        <li @click="activeTab = 'actions'" role="tab" :aria-selected="activeTab === 'actions'"><a>Actions</a></li>
                        <li @click="activeTab = 'oldjingles'" role="tab" :aria-selected="activeTab === 'oldjingles'"><a>Jingles (old)</a></li>
                        <li @click="activeTab = 'debug'" role="tab" :aria-selected="activeTab === 'debug'"><a>Debug</a></li>
                        <li @click="activeTab = 'clippy'" role="tab" :aria-selected="activeTab === 'clippy'"><a>Clippy</a></li>
                    </menu>
                    <div v-if="activeTab === 'actions'" class="window">
                        <div class="window-body windowcontent actions_view">
                            <p>hi</p>
                            <fieldset v-for="(group, groupName) in actions" :key="groupName">
                                <legend>{{ groupName }}</legend>
                                <button @click="action.exec" v-for="action in group" :key="action.id">{{ action.name }}</button>
                            </fieldset>
                        </div>
                    </div>

                    <div v-if="activeTab === 'oldjingles'" class="window jingles_old" role="tabpanel">
                        <div class="window-body windowcontent">
                            <button @click="thing">the fucking button</button>
                            <fieldset v-for="(jingles, programName) in jinglesByProgram" :key="programName">
                                <legend>{{ programName }}</legend>
                                <div class="jingle_thihing_container">
                                    <button v-for="jingle in jingles" :key="jingle.name" @click="play(jingle.file)">{{ jingle.name }}</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div v-if="activeTab === 'debug'" class="window debugging_view" role="tabpanel">
                        <div class="window-body windowcontent">
                            <div class="sunken-panel" style="max-height: 22vh;">
                                <table class="interactive" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Id</th>
                                            <th>Program</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="jingle in Object.values(jinglesByProgram).flat()" :key="jingle.id" @click="selectItem(jingle.type, jingle.id)" :class="{ highlighted: jingle.id === selectedItem }">
                                            <td>{{ jingle.name }}</td>
                                            <td>{{ jingle.id }}</td>
                                            <td>{{ jingle.program }}</td>
                                            <td>{{ jingle.type }}</td>
                                            <td>{{ getInstance(jingle.id, jingle.type)?.howl.state() || '¯\\_(ツ)_/¯' }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <fieldset>
                                <legend>Debug fuckeries</legend>
                                <div class="field-row-stacked-but-from-mxm">
                                    <label for="debugjingle">Play Jingle by id</label>
                                    <input id="debugjingle" type="text" v-model="dbg_fields.playJingleId" />
                                    <div class="debugbuttonctr">
                                        <button @click="playIdent(dbg_fields.playJingleId)">Play</button>
                                        <button @click="stopIdent(dbg_fields.playJingleId); clip?.play('Congratulate')">Stop</button>
                                        <button @click=" clip?.play('Wave'); clip?.speak('This does not work :c')">Fade In</button>
                                        <button @click="fadeOutJingle(dbg_fields.playJingleId, 1500);">Fade Out</button>
                                    </div>
                                </div>
                                <div class="field-row-stacked-but-from-mxm">
                                    <label for="debugtapijtje">Play Tapijtje by id</label>
                                    <input id="debugtapijtje" type="text" v-model="dbg_fields.playTapijtjeId" />
                                    <div class="debugbuttonctr">
                                        <button @click="playTapijtje(dbg_fields.playTapijtjeId)">Play</button>
                                        <button @click="stopTapijtje(dbg_fields.playTapijtjeId); clip?.play('Congratulate')">Stop</button>
                                        <button @click=" clip?.play('Wave'); clip?.speak('This does not work :c')">Fade In</button>
                                        <button @click="fadeOutTapijtje(dbg_fields.playTapijtjeId, 1500);">Fade Out</button>
                                    </div>
                                </div>
                                <div class="field-row-stacked-but-from-mxm">
                                    <label for="debugeffect">Play Effect by id</label>
                                    <input id="debugeffect" type="text" v-model="dbg_fields.playEffectId" />
                                    <div class="debugbuttonctr">
                                        <button @click="playEffect(dbg_fields.playEffectId)">Play</button>
                                        <button @click="stopEffect(dbg_fields.playEffectId); clip?.play('Congratulate')">Stop</button>
                                        <button @click=" clip?.play('Wave'); clip?.speak('This does not work :c')">Fade In</button>
                                        <button @click="fadeOutEffect(dbg_fields.playEffectId, 1500);">Fade Out</button>
                                    </div>
                                </div>
                            </fieldset>
                            <div class="button_container">
                                <button @click="clip?.play('Wave'); clip?.speak('This does not work :c')">Quit</button>
                                <button @click="loadJingles(); clip?.play('Congratulate')">Initialize Jingles</button>
                                <button @click="_loadEverything(); clip?.play('Thinking')" class="default">Load all</button>
                                <StartBtn @click=" clip?.play('Wave'); clip?.speak('This does not work :c')">Start</StartBtn>
                            </div>
                        </div>
                    </div>

                    <div v-if="activeTab === 'clippy'" class="window clippy_view">
                        <div class="window-body windowcontent">
                            <fieldset>
                                <legend>Actions</legend>
                                <div>
                                    <button v-for="action in clip.animations()" :key="action" @click="clip.play(action)">{{ action }}</button>
                                </div>
                            </fieldset>

                            <img :src="clippymap" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="status-bar status" style="align-self: flex-end;">
                <p class="status-bar-field">System ready</p>
                <p class="status-bar-field">
                    <RealtimeLatency :supa_client="supabase" />
                </p>
                <p class="status-bar-field">Last message: {{ latest_msg }}</p>
                <p class="status-bar-field">{{ time }}</p>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { actions, run_action_by_id } from './audioutils/actions';
import { Howl } from 'howler';
import { onMounted, reactive, ref, onErrorCaptured } from 'vue';
import { _loadEverything, tests, playEffect, playIdent, playTapijtje, getInstance, loadJingles, stopIdent, stopEffect, stopTapijtje, fadeOutEffect, fadeOutJingle, fadeOutTapijtje } from './player';
import { JingleType, jinglesByProgram } from './audioutils/jingles';
import clippy, { Agent } from './clippy/index';
import LoadingView from './Views/LoadingView.vue';
import Error from './Views/Error.vue';
import StartBtn from './components/StartBtn.vue'
import clippymap from './clippy/agents/Clippy/map.png';
import { createClient } from '@supabase/supabase-js';

const hasLoaded = ref(false);
const activeTab = ref<'actions' | 'oldjingles' | 'debug' | 'clippy'>('debug');

const env = import.meta.env
const supabase = createClient(env.VITE_APP_SUPABASE_URL, env.VITE_APP_SUPABASE_KEY)
const latest_msg = ref('N/A')

const jingleChannel = supabase.channel('backstage', {
    config: {
        broadcast: { ack: true }
    }
})

// jingleChannel.subscribe(async (status) => {
//     if (status !== 'SUBSCRIBED') { return }

//     const serverResponse = await jingleChannel.send({
//         type: 'broadcast',
//         event: 'acknowledge',
//         payload: {},
//     })

//     console.log('serverResponse', serverResponse)
// })


// Subscribe to the Channel
jingleChannel.on('broadcast',
    {
        event: 'jingle_action'
    }, // Listen for "shout". Can be "*" to listen to all events
    async ({ payload }) => {
        console.log('Got message', payload)
        const serverResponse = await jingleChannel.send({
            type: 'broadcast',
            event: 'acknowledge',
            payload: {},
        })

        console.log('serverResponse', serverResponse)
        latest_msg.value = `p:${payload.action_id}`
        // actions[payload.group][payload.action_id].exec()
        run_action_by_id(payload.action_id)
    }
)
    .subscribe()

const dbg_fields = reactive({
    playJingleId: '',
    playTapijtjeId: '',
    playEffectId: ''
})

// Old jingle player
const thing = () => {
    tests.play()
}

const play = (file: string) => {
    new Howl({
        src: [file]
    }).play();
}

// Debug view  
const selectedItem = ref(null);
const selectItem = (type: JingleType, id: string) => {
    selectedItem.value = id;
    switch (type) {
        case JingleType.Effect:
            dbg_fields.playEffectId = id;
            break;
        case JingleType.Ident:
            dbg_fields.playJingleId = id;
            break;
        case JingleType.Tapijtje:
            dbg_fields.playTapijtjeId = id;
            break;
        default:
            throw Error('mommy?');
    }
}

// Status bar
const updateClock = () => {
    const date = new Date();
    const formatted = Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
    time.value = formatted;
};
const time = ref('HUUH???');

const clip = ref<Agent | undefined>();

onMounted(() => {
    setInterval(updateClock, 100);

    clippy.load({
        name: 'Clippy',
        // selector: 'my-clippy',
        successCb: (agent) => {
            clip.value = agent
            agent.moveTo(40, 40, 0)
            console.log(agent.animations())
            // agent.show(false);
            agent.play('Greeting')
            agent.speak("It looks like you're debugging this shit. Would you like help?", false);
            agent.play('Congratulate', 10000);
            // agent.animate();
        },
        failCb: (e) => {
            console.error(e)
        }
    })
});


const isError = ref('');
onErrorCaptured((err: any) => {
    console.error('error captured, ', err);
    isError.value = err.message;
    return false;
});
</script>

<style lang="scss" scoped>
.cont {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.windowcontent {
    /* flex-grow: 1; */
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
}

h1 {
    margin-left: 20px;
    margin-top: 0;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: -10px 10px 0px #00e6e6, -20px 20px 0px #01cccc, -30px 30px 0px #00bdbd;
}

.actions_view {
    fieldset {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
}

.jingles_old {
    button {
        width: fit-content;
    }
    
    .jingle_thihing_container {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
}

.debugging_view {
    .debugbuttonctr {
        display: flex;
        gap: 6px;
    }

    .field-row-stacked-but-from-mxm {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .button_container {
        display: flex;
        gap: 6px;
        justify-content: end;
    }
}

.status {
    width: 100%;
}
</style>
