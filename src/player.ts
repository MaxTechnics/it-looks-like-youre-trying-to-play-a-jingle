import test from './J_13_start_generiek.wav';
import welc from './audioutils/audio/98start.wav';
import { Howl } from 'howler';
import { Jingle, JingleType, jinglesByProgram } from './audioutils/jingles';

export const tests = new Howl({
    src: [test]
});

export const starter = new Howl({
    src: [welc]
});

interface HowlerJukeBoxInstance {
    id: string;
    howl: Howl;
    program: string;
    onStart?: () => void;
}

interface HowlerCollection {
    [jingle_id: string]: HowlerJukeBoxInstance;
}

const howler_idents: HowlerCollection = {}
const howler_effects: HowlerCollection = {}
const howler_tapijtjes: HowlerCollection = {}

export const getInstance = (id: string, type: JingleType) => {
    switch (type) {
        case JingleType.Ident:
            return howler_idents[id]
        case JingleType.Effect:
            return howler_effects[id];
        case JingleType.Tapijtje:
            return howler_tapijtjes[id];
    }
}

// Function to load jingles into their respective collections
export const loadJingles = async () => {
    const allJingles: Jingle[] = Object.values(jinglesByProgram).flat();

    allJingles.forEach(jingle => {
        const { id, type, file, program, loops } = jingle;

        const howlInstance = new Howl({
            src: [file],
            preload: false,
            // loop: false,  // TODO: This needs to be updated later as we do in fact define this
            loop: loops  // TODO: This needs to be updated later as we do in fact define this
            //   volume: 1,  // Volumes of jingles need to be looked into in due time
        });

        const jukeboxInstance: HowlerJukeBoxInstance = { id: id, program: program, howl: howlInstance };

        // Store the Howl instance in the correct collection based on type
        switch (type) {
            case JingleType.Ident:
                howler_idents[id] = jukeboxInstance;
                break;
            case JingleType.Effect:
                howler_effects[id] = jukeboxInstance;
                break;
            case JingleType.Tapijtje:
                howler_tapijtjes[id] = jukeboxInstance;
                break;
            default:
                console.log(`Unknown jingle type: ${type}`);
                break;
        }
    });

    console.log('Jingles loaded into collections');
    console.log('Idents:', howler_idents);
    console.log('Effects:', howler_effects);
    console.log('Tapijtjes:', howler_tapijtjes);
};

const _play = (collection: HowlerCollection, id: string) => {
    const instance = collection[id];
    if (!instance) return console.error('Could not play jingle, id unknown:', id);

    if (instance.howl.state() === 'unloaded') {
        instance.howl.load();
        return console.error('Instance is not loaded, loading');
    }

    console.log('Will play jingle', instance);
    instance.howl.play();
}

export const playIdent = (id: string) => _play(howler_idents, id);
export const playEffect = (id: string) => _play(howler_effects, id);
export const playTapijtje = (id: string) => _play(howler_tapijtjes, id);

const _stop = (collection: HowlerCollection, id: string) => {
    const instance = collection[id];
    if (!instance) return console.error('Could not stop jingle, id unknown:', id);

    console.log('Will stop instance', instance);
    instance.howl.stop();
}

export const stopIdent = (id: string) => _stop(howler_idents, id);
export const stopEffect = (id: string) => _stop(howler_effects, id);
export const stopTapijtje = (id: string) => _stop(howler_tapijtjes, id);

const d = (dur: number) => new Promise(r => setTimeout(r, dur));

const _fadeOut = async (collection: HowlerCollection, id: string, duration: number) => {
    const instance = collection[id];
    if (!instance) return console.error('Could not fade out jingle, id unknown:', id);

    console.log('Will fade out', instance);
    const originalVolume = instance.howl.volume();
    instance.howl.fade(originalVolume, 0, duration);
    await d(duration);
    instance.howl.stop();
    instance.howl.volume(originalVolume);
}

export const fadeOutJingle = async (id: string, duration: number) => _fadeOut(howler_idents, id, duration);
export const fadeOutEffect = async (id: string, duration: number) => _fadeOut(howler_effects, id, duration);
export const fadeOutTapijtje = async (id: string, duration: number) => _fadeOut(howler_tapijtjes, id, duration);

// export const _loadEverything = () => {
//     const collections = [howler_idents, howler_effects, howler_tapijtjes];

//     collections.forEach(collection => {
//         Object.values(collection).forEach(item => {
//             item.howl.load();
//         });
//     });
// }

export const _loadEverything = () => {
    const collections = [howler_idents, howler_effects, howler_tapijtjes];
    let allItems: HowlerJukeBoxInstance[] = [];

    // Collect all the items from the collections
    collections.forEach(collection => { allItems = allItems.concat(Object.values(collection)) });

    // Group items by program
    const groupByProgram = (items: HowlerJukeBoxInstance[]) => items.reduce((groups, item) => {
        const program = item.program;
        if (!groups[program]) groups[program] = [];
        groups[program].push(item);
        return groups;
    }, {} as Record<string, HowlerJukeBoxInstance[]>);

    const loadProgramSequentially = (programItems: HowlerJukeBoxInstance[], batchSize = 5) => {
        return new Promise<void>((resolve) => {
            let index = 0;

            const loadBatch = () => {
                const batch = programItems.slice(index, index + batchSize);
                let loadedCount = 0;

                // Load each item in the batch
                batch.forEach(item => {
                    item.howl.once('load', () => {
                        loadedCount++;
                        if (loadedCount === batch.length) {
                            index += batchSize; // Once all items in the batch are loaded, move to the next batch
                            index < programItems.length ? loadBatch() : resolve();
                        }
                    });

                    item.howl.load();
                });
            };

            loadBatch();
        });
    };

    // Function to load items for each program sequentially
    const loadInProgramsSequentially = async () => {
        const itemsByProgram = groupByProgram(allItems);

        for (const program in itemsByProgram) {
            // Wait for the current program's items to load before moving to the next program
            console.log(`Loading program: ${program}`);
            await loadProgramSequentially(itemsByProgram[program]);
            console.log(`Finished loading program: ${program}`);
        }

        console.log("All programs loaded.");
    };

    loadInProgramsSequentially();
};
