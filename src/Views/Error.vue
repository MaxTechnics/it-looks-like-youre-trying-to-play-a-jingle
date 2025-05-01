<template>
    <div class="bsod">
        <div class="bsod-center">
            <div class="title"><span>JUKEBOX</span></div>
            <p>A fatal exception 0E has occured at 0028:C0014FCA. Jukebox will be terminated.</p>
            <p>* Error:
                <slot />
            </p>
            <p>* Press CTRL+ALT+DEL again to restart your computer. You will<br /><span>lose any unsaved information in all applications.</span></p>
            <div class="action">Press any key to do nothing<span><u>&nbsp;</u></span></div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.bsod {
    font-family: 'Pixelated MS Sans Serif';
	background: #0000a8;
	color: #f9f9fb;
	user-select: none;
	.bsod-center {
		// font-family: "Share Tech Mono", monospace;
		// font-size: 16px;
		font-size: 24px;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
        overflow: hidden;

		.title {
			text-align: center;
			span {
				display: inline-block;
				padding: 0.125em 0.5em;
				background: silver;
				color: #0000a8;
		@apply mb-10;
			}
		}
		p {
			span {
				margin-left: 16px;
			}
		}
		.action {
			text-align: center;
			span {
				font-size: 1.25em;
				u {
					animation: blink 1s linear infinite;
				}
			}
		}
	}
}

@keyframes blink {
	0% {color: #f9f9fb;}
	49% {color: #f9f9fb;}
	50% {color: transparent;}
	99% {color: transparent;}
}

@media all and (max-width: 640px) {
	body {
		// background: red;
	}
	.window {
		left: 140px;
		transform: translate(0%,-46%);
	}
}
</style>
