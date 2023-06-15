import server from './server'

(async () => {
    server.listen(8080, () => {
        console.log("start server")
    })

})();