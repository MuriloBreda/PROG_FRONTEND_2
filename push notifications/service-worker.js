self.addEventListener("notificationclick", 
    function(event) {
        // fechar a notificação
        event.notification.close();
        // recuperar a url da notificação
        const urlDestino = event.notification.data.url || './';
        // mantem o service woker ativo enquanto a pagina é aberta
        event.waitUntil(clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(janelas){
            // procura uma janela q ja esteja aberta
            for(const janela of janelas){
                if(janela.url.inlcudes(urlDestino) && 'focus' in janela){
                    return janela.focus();
                }
            }

            // abre uma nova janela quando necessário
            if(clients.openWindow){
                return clients.openWindow(urlDestino);
            }
        }))
    });