<template lang="pug">
div Tesseract
    form(action='#')
        input(type='file', name='', @change='getFile($event)')
</template>

<script>
import Tesseract from 'tesseract.js'
import UploadFileService from './services/UploadFileService'

export default {
    name: 'App',
    components: {},
    data() {
        return {
            file: '',
            reader: '',
            worker: '',
            fileInfos: [],
        }
    },

    methods: {
        upload() {
            // .then((resp) =>)
        },
        async getFile(event) {
            this.file = event.target.files[0]
            this.reader = new FileReader()
            this.reader.readAsText(this.file)
            console.log(this.file)
            UploadFileService.upload(this.file)
                .then(resp => {
                    console.log(resp)
                    return UploadFileService.getFiles()
                })
                .then(files => {
                    console.log(files)
                    this.fileInfos = files.data
                })

            Tesseract.recognize(this.file.name, 'eng', {
                logger: m => console.log(m),
            }).then(({ data: { text } }) => {
                console.log(text)
            })
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
