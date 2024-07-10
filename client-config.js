import SilexCms from './js/silex-cms/client.js'
import onboarding from './js/client-plugins/onboarding.js'

// This file is loaded by Silex when the user opens the editor
// Its path is set in the environment variable SILEX_CLIENT_CONFIG in index.js
import websiteInfoPlugin from './plugins/client/website-info.js'
import navbar from 'grapesjs-navbar'
export default async function (config) {
    config.addPlugin(websiteInfoPlugin, {})
    config.addPlugin(onboarding, {})
    config.addPublicationTransformers({
        transformPermalink: (path, type) => {
            // Replace /index.html with /
            return type === 'html' && path.endsWith('/index.html') ? path.replace(/index\.html$/, '') : path
        },
    })
    // CMS Plugin
    config.addPlugin(SilexCms, {
        dataSources: [],
        imagePlugin: false,
        i18nPlugin: false,
        fetchPlugin: false,
        // enable11ty: false,
        view: {
            // disableStates: true,
            // disableAttributes: false,
            // disableProperties: true,
        },
    })

    config.on('silex:grapesjs:start', () => {
        // Or change other config from GrapesJs: config.grapesJsConfig.autoLoad = false
        config.grapesJsConfig.plugins = [{
            ...config.grapesJsConfig.plugins,
            navbar
            // here your plugin as you would in grapesjs config
        }]
    })


    return {}
}
