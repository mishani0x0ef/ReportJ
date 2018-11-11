import pluralize from "pluralize";

const messages = {
    common: {
        components: {
            underDevelopment: {
                header: "Under development",
                text: "Working hard to bring this feature to you...",
            },
        },
    },

    popup: {
        templates: {
            loading: "Loading your awersome templates...",
        },
        commits: {
            loading: "Check your autstanding work progress...",
        },
    },

    options: {
        templates: {
            usedTemplates: (used, from) => `${used}/${from} templates`,
            usedSymbols: (used, from) => `${used}/${from}`,
            undoDelete: (itemsCount) => `${itemsCount} ${pluralize("template", itemsCount)} deleted`,
        },
    },
}

export default messages;