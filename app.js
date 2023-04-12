const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'dos']).addAnswer(['🏦Banco Pichincha🏦',
                                                            'cuenta de ahorros💰: 2203271574',
                                                            'Sangacha Marco',
                                                            'correo: sangachamarcos@gmail.com',
                                                            '*Enviar una foto del comprobante o recibo para la entrega de su cuenta, un asesor de contactará con usted en unos minutos, GRACIAS.*'
                                                        ])

const flowDocs = addKeyword(['1']).addAnswer(
    [
        '100% CONFIABLE!!! NETFLlX  PREMIUM🔥 4K ULTRA HD🎬🇪🇨',
        '1 Pantalla.  📺 5$',
        '2 Pantallas 📺 9$',
        '3 Pantallas 📺12$💰',
        '4 Pantallas 📺15$(Cuenta entera 5 perfiles)👉Si desea la Cuenta Entera🎬*',
        'Además el servicio de Amazon prime video, disney, hbo max en sólo $5.00💰👈 y para rematar ya tenemos habilitada la plataforma de Star+ a solo $3.00 la pantalla',
        'Ahora contamos con Magis tv a tan solo $10.00 (3 dispositivos)',
        'Metodo de pago: Depositos en Tiendas, Farmacias-Corresponsales Banco Pichincha y Guayaquil 🇪🇨',
        '\nEscriba el número *2* Para obtener los datos bancarios para su deposito',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['4']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['2']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['3']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenidos bot BEMARNET te saluda')
    .addAnswer(
        [
            'Te comparto las opciones de servicio que tenemos disponible',
            '👉 *1:* Servicio de Streamin (entretenimiento)',
            '👉 *2:*  Servicio de envio de mensajes masivos con publicidad de tu empresa',
            '👉 *3:* Servicio tecnico en reparación de equipos de computo',
            '👉 *4:* Servicio de instalación de Cámaras de videoseguridad',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
)


const flowString = addKeyword('botones').addAnswer('Este mensaje envia tres botones', {
    buttons: [
        {
             body: '1' 
        }, 
        { 
            body: '2' 
        }, 
        { 
            body: '3' 
        }, 
        { 
            body: '4' 
        } 
    ],
})

/*const flujoImagen = addKeyword(['imagen'])
    .addAnswer('🙌 Hola, te estoy enviando una imagen:',{      
            media: 'https://parzibyte.me/blog/wp-content/uploads/2019/12/Convertir-cadena-a-n%C3%BAmero-en-C.png'
    }
)*/
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowString])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
        blackList: [],
    })

    QRPortalWeb()
}

main()
