<template lang="pug">
div Tesseract
    form(action='#')
        input(type='file', name='', @change='getFile($event)')
</template>

<script>
import { createWorker } from 'tesseract.js'
import path from 'path'

export default {
    name: 'App',
    components: {},
    data() {
        return {
            file: '',
            reader: '',
            worker: '',
        }
    },

    mounted() {
        this.worker = createWorker({
            langPath: path.join(__dirname, '..', 'lang-data'),
            logger: m => console.log(m),
        })
    },

    methods: {
        async getFile(event) {
            this.file = event.target.files[0]
            this.reader = new FileReader()
            this.reader.readAsText(this.file)
            console.log(this.file)

            // Tesseract.recognize(this.file.name, 'eng', {
            //     logger: m => console.log(m),
            // }).then(({ data: { text } }) => {
            //     console.log(text)
            // })

            await this.worker.load()
            await this.worker.loadLanguage('eng')
            await this.worker.initialize('eng')
            const {
                data: { text },
            } = await this.worker.recognize(
                path.join(__dirname, '..', 'images', this.file.name)
            )
            console.log(text)
            await this.worker.terminate()
        },
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
