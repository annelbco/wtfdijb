import http from '../http-common'

class UploadFileService {
    upload(file) {
        let formData = new FormData()
        formData.append('file', file)

        return http.post('/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    getFiles() {
        return http.get('/files')
    }
}

export default new UploadFileService()
