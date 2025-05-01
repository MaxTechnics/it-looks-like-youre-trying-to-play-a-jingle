<template>
    <div class="text-container">
        <i>
            <span v-for="(letter, index) in letters" :key="index" :style="getStyle(index)">
                {{ letter }}
            </span>
        </i>
    </div>
</template>
  
<script setup lang="ts">
import { computed, ref } from 'vue';

const colors = ["#00db96", "#49297e", "#90dcff", "#e10086", "#fdfb76",]

const text = ref('The Jukebox');
const letters = computed(() => text.value.split(''));

const getStyle = (idx) => {
    return {
        display: 'inline-block',
        padding: '5px',
        color: 'white',
        animation: `colorShift 5s infinite alternate`,
        animationDelay: `${idx * 1}s`, // Stagger delay for each letter
    };
}
</script>
  
<style scoped>
@keyframes colorShift
{
    0%
    {
        background: #00db96;
    }

    25%
    {
        background: #49297e;
    }

    50%
    {
        background: #90dcff;
    }

    75%
    {
        background: #e10086;
    }

    100%
    {
        background: #fdfb76;
    }
}
</style>
  