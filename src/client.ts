import { param, deparam } from './deparam';
import { ResizeMessage } from './measure';
import { preferredThemeId, preferredTheme } from './preferred-theme';

// slice access token from query string
const params = deparam(location.search.substr(1));
const token = params.vartalk;

if (token) {
    delete params.vartalk;

    let search = param(params);

    if (search.length) {
        search = '?' + search;
    }

    history.replaceState(undefined, document.title, location.pathname + search + location.hash);
}

let script = document.currentScript as HTMLScriptElement;
let comment = document.querySelector('#comment') as HTMLDivElement;

if (script === undefined) {
    // Internet Explorer :(
    // tslint:disable-next-line:max-line-length
    script = document.querySelector('script[src^="https://vartalk.cn/client.js"],script[src^="http://localhost:4000/client.js"]') as HTMLScriptElement;
}

// gather script element's attributes
const attrs: Record<string, string> = {};

for (let i = 0; i < script.attributes.length; i++) {
    const attribute = script.attributes.item(i)!;

    attrs[attribute.name.replace(/^data-/, '')] = attribute.value; // permit using data-theme instead of theme.
}

if (attrs.theme === preferredThemeId) {
    attrs.theme = preferredTheme;
}

// gather page attributes
const canonicalLink = document.querySelector(`link[rel='canonical']`) as HTMLLinkElement;

attrs.url = canonicalLink ? canonicalLink.href : location.origin + location.pathname + location.search;
attrs.origin = location.origin;
attrs.pathname = location.pathname.length < 2 ? 'index' : location.pathname.substr(1).replace(/\.\w+$/, '');
attrs.title = document.title;

const descriptionMeta = document.querySelector(`meta[name='description']`) as HTMLMetaElement;

attrs.description = descriptionMeta ? descriptionMeta.content : '';

// truncate descriptions that would trigger 414 "URI Too Long"
const len = encodeURIComponent(attrs.description).length;

if (len > 1000) {
    attrs.description = attrs.description.substr(0, Math.floor(attrs.description.length * 1000 / len));
}

const ogtitleMeta = document.querySelector(`meta[property='og:title'],meta[name='og:title']`) as HTMLMetaElement;

attrs['og:title'] = ogtitleMeta ? ogtitleMeta.content : '';
attrs.token = token;

// create the standard vartalk styles and insert them at the beginning of the
// <head> for easy overriding.
// NOTE: the craziness with "width" is for mobile safari :(
document.head.insertAdjacentHTML(
    'afterbegin',
    `<style>
        .vartalk {
            position: relative;
            box-sizing: border-box;
            width: 100%;
            max-width: 760px;
            margin-left: auto;
            margin-right: auto;
        }
        .vartalk-frame {
            position: absolute;
            left: 0;
            right: 0;
            width: 1px;
            min-width: 100%;
            max-width: 100%;
            height: 100%;
            border: 0;
        }
    </style>`);

// create the comments iframe and it's responsive container
const vartalkOrigin = script.src.match(/^https:\/\/vartalk\.cn|http:\/\/localhost:\d+/)![0];
const url = `${vartalkOrigin}/vartalk.html`;

if (comment) {
    comment.insertAdjacentHTML('afterend', `
        <div class="vartalk">
            <iframe class="vartalk-frame" title="Comments" scrolling="no" src="${url}?${param(attrs)}"></iframe>
        </div>
    `);

    const container = comment.nextElementSibling as HTMLDivElement;

    comment.parentElement!.removeChild(comment);

    // adjust the iframe's height when the height of it's content changes
    addEventListener('message', event => {
        if (event.origin !== vartalkOrigin) {
            return;
        }

        const data = event.data as ResizeMessage;

        if (data && data.type === 'resize' && data.height) {
            container.style.height = `${data.height}px`;
        }
    });
}
