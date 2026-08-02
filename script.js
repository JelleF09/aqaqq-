const WEBHOOK =
"https://discordapp.com/api/webhooks/1404081818210140261/eqgIhBzxtjWIrnvZgvL6I2lJk5huWk2GOmBoeCZxydMdcEE_pqziaOkZd1MQDyOrY1HC";


async function collect(){

    let gpu = "Unknown";

    try {

        const canvas =
            document.createElement("canvas");

        const gl =
            canvas.getContext("webgl");

        const debug =
            gl.getExtension(
                "WEBGL_debug_renderer_info"
            );

        gpu =
            gl.getParameter(
                debug.UNMASKED_RENDERER_WEBGL
            );

    } catch(e){}


    return {

        browser:
            navigator.userAgent,


        language:
            navigator.language,


        languages:
            navigator.languages.join(", "),


        timezone:
            Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone,


        screen:
        `${screen.width}x${screen.height}`,


        viewport:
        `${innerWidth}x${innerHeight}`,


        pixelRatio:
            devicePixelRatio,


        cpu:
            navigator.hardwareConcurrency || "unknown",


        ram:
            navigator.deviceMemory
            ?
            navigator.deviceMemory+" GB"
            :
            "unknown",


        touch:
            navigator.maxTouchPoints,


        gpu,


        cookies:
            navigator.cookieEnabled,


        online:
            navigator.onLine,


        url:
            location.href,


        referrer:
            document.referrer || "direct",


        time:
            new Date().toISOString()

    };

}



async function sendDiscord(data){


const embed = {


title:
"🌐 New Visitor",


color:
5814783,


fields:[

{
name:"🖥 Browser",
value:
"```"+data.browser.slice(0,900)+"```"
},


{
name:"🌍 Language",
value:
`${data.language}\n${data.languages}`
},


{
name:"⏰ Timezone",
value:
data.timezone
},


{
name:"📺 Display",
value:
`${data.screen}\nViewport: ${data.viewport}\nDPR: ${data.pixelRatio}`
},


{
name:"⚙️ Hardware",
value:
`CPU: ${data.cpu}\nRAM: ${data.ram}\nTouch: ${data.touch}`
},


{
name:"🎮 GPU",
value:
"```"+data.gpu.slice(0,900)+"```"
},


{
name:"🔗 Page",
value:
data.url
},


{
name:"↩️ Referrer",
value:
data.referrer
}

],


footer:{
text:
"Frontend visitor test"
},


timestamp:
data.time


};


await fetch(WEBHOOK,{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
embeds:[embed]
})

});


}



(async()=>{

const info =
await collect();

await sendDiscord(info);


})();
