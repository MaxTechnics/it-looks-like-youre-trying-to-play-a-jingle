<template>
    <div class="window-body windowcontent">
        <div class="sunken-panel" style="height: 100%;">
            <table v-if="Object.values(filteredJingles).flat().length !== 0" class="interactive" style="width: 100%;">
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
                    <tr v-for="jingle in Object.values(filteredJingles).flat()" :key="jingle.id">
                        <td>{{ jingle.name }}</td>
                        <td>{{ jingle.id }}</td>
                        <td>{{ jingle.program }}</td>
                        <td>{{ jingle.type }}</td>
                        <td>{{ getInstance(jingle.id, jingle.type)?.howl.state() || '¯\\_(ツ)_/¯' }}</td>
                    </tr>
                </tbody>
            </table>
            <img v-else :src="pcok" style="width: 100%; height: 100%;" class="funny">
        </div>
        <div class="button_container">
            <button :disabled="btnInitialized" @click="loadJingles(); btnInitialized = true">Initialize Jingles</button>
            <button :disabled="Object.values(filteredJingles).flat().length === 0 || btnInitialized === false" @click="_loadEverything()" class="default">Load all</button>
            <StartBtn :disabled="!canStart" @click="doLoad()">Start</StartBtn>
        </div>
        <div class="progress-indicator segmented">
            <span class="progress-indicator-bar" :style="`width: ${loadingPercentage}%;`" />
        </div>

        <div class="modal" v-if="!false">
            <div class="window">
                <div class="title-bar">
                    <div class="title-bar-text">Partial load</div>
                    <div class="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div class="window-body">
                    <p>Choose which program to initalize.</p>
                    <fieldset>
                        <legend>Program</legend>
                        <div class="field-row" v-for="program in programs" :key="program">
                            <input v-model="partialLoadPrograms" :value="program" type="checkbox" :id="program">
                            <label :for="program">{{ program }}</label>
                        </div>
                    </fieldset>
                    <button></button><button></button><button></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { _loadEverything, getInstance, starter } from '../player';
import StartBtn from '../components/StartBtn.vue';
import { jinglesByProgram } from '../audioutils/jingles';
import { loadJingles } from '../player';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import pcok from '../images/pcthumbsup.gif';

const counter = ref(0);
let countertimer: NodeJS.Timeout = null;

const btnInitialized = ref(false);

const filteredJingles = computed(() => Object.values(jinglesByProgram).flat().filter(jingle => {
    let test = counter.value + jingle.id
    return getInstance(jingle.id, jingle.type)?.howl?.state() !== 'loaded';
}));

const canStart = computed(() => {
    if (Object.values(filteredJingles.value).flat().length === 0) return true; // we can also start if everything is loaded
    if (btnInitialized.value === false) return true; // We can start without initializing jingles
    else return false;
});

const loadingPercentage = computed(() => {
    const total = Object.values(jinglesByProgram).flat().length;
    const current = Object.values(filteredJingles.value).flat().length;

    const percentage = (current / total) * 100;
    return percentage;
})

const programs = ref(Object.keys(jinglesByProgram).flat());
const partialLoadPrograms = ref(Object.keys(jinglesByProgram).flat());

const doLoad = () => {
    starter.play();
    emit('load');
}

onMounted(() => {
    console.log('Starting counter');
    countertimer = setInterval(() => { counter.value++ }, 100);
})

onBeforeUnmount(() => {
    console.log('Stopping counter');
    clearInterval(countertimer);
})

const emit = defineEmits(['load']);
</script>

<style lang="scss" scoped>
.button_container {
    display: flex;
    gap: 6px;
    justify-content: end;
}

.funny {
    display: flex;
    justify-items: center;
    align-items: center;
}

.progress-indicator {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 0;
    box-shadow: inset -2px -2px #dfdfdf,inset 2px 2px grey;
    box-sizing: border-box;
    height: 32px;
    padding: 4px;
    position: relative;
    .progress-indicator-bar {
        background-color: navy;
        display: block;
        height: 100%;
    }
}

.progress-indicator.segmented > .progress-indicator-bar {
  width: 100%;
  background-color: transparent; /* resets the background color which is set to blue in the non-segmented selector */
//   background-image: linear-gradient( 90deg, var(--dialog-blue) 0 16px, transparent 0 2px);
  background-image: linear-gradient( 90deg, #000080 0 16px, transparent 0 2px);
  background-repeat: repeat;
  background-size: 18px 100%;
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .window {
        position: absolute;
        min-width: 50%;
        // display: flex;
	    // flex-direction: column;
        // align-items: center;
    }
}
</style>
