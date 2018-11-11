const config = {
    app: {
        name: NAME,
        description: DESCRIPTION,
        version: VERSION,
        homePage: HOME_URL,
        feedbackPage: "https://chrome.google.com/webstore/detail/reportj/hijbdbjoelgicnhnghhhlkpbhjdmchfg?utm_source=chrome-ntp-icon",
        author: {
            email: "mishani0x0ef@gmail.com"
        }
    },
    api: {
        reportjApiUrl: "http://localhost:1062/api/"
    }
}

Object.freeze(config);

export default config;