const config = {
    app: {
        name: NAME,
        description: DESCRIPTION,
        version: VERSION,
        homePage: HOME_URL,
        feedbackPage: "https://docs.google.com/forms/d/1x3dH1dE1GtiwZO8lsT8YNthr4d1R_8pZsU2Om1aBLLw/viewform?usp=send_form",
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