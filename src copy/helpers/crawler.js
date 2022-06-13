const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

const fs = require('fs');
const path = require('path');
const glob = require('glob');



const BROWSER_HEADLESS = true;
const DEVTOOLS = false;

const SLEEP_TIMEOUT = 1000;
const RESPONSE_TIMEOUT = 60000;
const BROWSER_WIDTH = 1920;
const BROWSER_HEIGHT = 1080;
const LOCALE = "es";
const EMULATED_DEVICE = "";

const EXIT_OK = 0;
const EXIT_GENERIC_ERROR = 1;
const EXIT_NO_DOMAIN_PARAM = 2;
const EXIT_RESPONSE_NO_OK = 3;
const EXIT_RESPONSE_NO_HTML = 4;

// Retardo usado para dar tiempo a ciertas acciones
const DELAY = 1000;

// Lista sacada de:
// https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteerdevices
// https://raw.githubusercontent.com/puppeteer/puppeteer/main/src/common/DeviceDescriptors.ts
const EMULATED_DEVICES = [
    'Blackberry PlayBook',
    'Blackberry PlayBook landscape',
    'BlackBerry Z30',
    'BlackBerry Z30 landscape',
    'Galaxy Note 3',
    'Galaxy Note 3 landscape',
    'Galaxy Note II',
    'Galaxy Note II landscape',
    'Galaxy S III',
    'Galaxy S III landscape',
    'Galaxy S5',
    'Galaxy S5 landscape',
    'Galaxy S8',
    'Galaxy S8 landscape',
    'Galaxy S9+',
    'Galaxy S9+ landscape',
    'Galaxy Tab S4',
    'Galaxy Tab S4 landscape',
    'iPad',
    'iPad landscape',
    'iPad Mini',
    'iPad Mini landscape',
    'iPad Pro',
    'iPad Pro landscape',
    'iPhone 4',
    'iPhone 4 landscape',
    'iPhone 5',
    'iPhone 5 landscape',
    'iPhone 6',
    'iPhone 6 landscape',
    'iPhone 6 Plus',
    'iPhone 6 Plus landscape',
    'iPhone 7',
    'iPhone 7 landscape',
    'iPhone 7 Plus',
    'iPhone 7 Plus landscape',
    'iPhone 8',
    'iPhone 8 landscape',
    'iPhone 8 Plus',
    'iPhone 8 Plus landscape',
    'iPhone SE',
    'iPhone SE landscape',
    'iPhone X',
    'iPhone X landscape',
    'iPhone XR',
    'iPhone XR landscape',
    'iPhone 11',
    'iPhone 11 landscape',
    'iPhone 11 Pro',
    'iPhone 11 Pro landscape',
    'iPhone 11 Pro Max',
    'iPhone 11 Pro Max landscape',
    'JioPhone 2',
    'JioPhone 2 landscape',
    'Kindle Fire HDX',
    'Kindle Fire HDX landscape',
    'LG Optimus L70',
    'LG Optimus L70 landscape',
    'Microsoft Lumia 550',
    'Microsoft Lumia 950',
    'Microsoft Lumia 950 landscape',
    'Nexus 10',
    'Nexus 10 landscape',
    'Nexus 4',
    'Nexus 4 landscape',
    'Nexus 5',
    'Nexus 5 landscape',
    'Nexus 5X',
    'Nexus 5X landscape',
    'Nexus 6',
    'Nexus 6 landscape',
    'Nexus 6P',
    'Nexus 6P landscape',
    'Nexus 7',
    'Nexus 7 landscape',
    'Nokia Lumia 520',
    'Nokia Lumia 520 landscape',
    'Nokia N9',
    'Nokia N9 landscape',
    'Pixel 2',
    'Pixel 2 landscape',
    'Pixel 2 XL',
    'Pixel 2 XL landscape',
    'Pixel 3',
    'Pixel 3 landscape',
    'Pixel 4',
    'Pixel 4 landscape'
]; 

// https://stackoverflow.com/questions/18814221/adding-timestamps-to-all-console-messages
require('console-stamp')(console, '[HH:MM:ss.l]');

function help(nodeExec, scriptPath) {
    const HELP = "\n" +
        "AYUDA:\n" +
        "  Se requiere al menos un parámetro: la URL. Debe ser el primer parámetro.\n" +
        "  El resto de parámetros no tienen un orden, pero sí un nombre y son los siguientes:\n" +
        "     sleepTimeout: número de ms. que se espera tras abrir y cargar la página, para que se ejecuten los JS. Por defecto es " + SLEEP_TIMEOUT + " ms.\n" +
        "     responseTimeout: número de ms. que se espera para recibir la respuesta desde el sitio web. Por defecto es " + RESPONSE_TIMEOUT + " ms.\n" +
        "     browserWidth: anchura de la pantalla. Por defecto es " + BROWSER_WIDTH + ".\n" +
        "     browserHeight: altura de la pantalla. Por defecto es " + BROWSER_HEIGHT + ".\n" +
        "     locale: código del idioma, por ejemplo es. Si no se indica ninguno, el de por defecto es el castellano (es).\n" +
        "     device: dispositivo a emular (iphone, etc.): si no se indica, seja vacío o se indica uno inexistente, se usará el chrome\n" +
        "             de ordenador, en el que se puede especificar las dimensiones con los parámetros 'browserWidth' y 'browserHeight'.\n" +
        "             Por reducir la lista se omiten los 'landscape', pero todos los dispositivos tienen una versión landscape. Así que\n" +
        "             además de 'iPhone 11', por ejemplo, también existe el correspondiente dispositivo 'iPhone 11 landscape', que sería\n" +
        "             el mismo dispositivo girándolo. Para elegir la versión landscape, sólo hay que añadir ' landscape' al nombre (con un espacio).\n" +
        "             Sólo hay una excepción, que no tiene la versión 'landscape', que es el 'Microsoft Lumia 550'. La lista de dispositivos:\n" +
        "               Blackberry PlayBook\n" +
        "               BlackBerry Z30\n" +
        "               Galaxy Note 3\n" +
        "               Galaxy Note II\n" +
        "               Galaxy S III\n" +
        "               Galaxy S5\n" +
        "               Galaxy S8\n" +
        "               Galaxy S9+\n" +
        "               Galaxy Tab S4\n" +
        "               iPad\n" +
        "               iPad Mini\n" +
        "               iPad Pro\n" +
        "               iPhone 4\n" +
        "               iPhone 5\n" +
        "               iPhone 6\n" +
        "               iPhone 6 Plus\n" +
        "               iPhone 7\n" +
        "               iPhone 7 Plus\n" +
        "               iPhone 8\n" +
        "               iPhone 8 Plus\n" +
        "               iPhone SE\n" +
        "               iPhone X\n" +
        "               iPhone XR\n" +
        "               iPhone 11\n" +
        "               iPhone 11 Pro\n" +
        "               iPhone 11 Pro Max\n" +
        "               JioPhone 2\n" +
        "               Kindle Fire HDX\n" +
        "               LG Optimus L70\n" +
        "               Microsoft Lumia 550\n" +
        "               Microsoft Lumia 950\n" +
        "               Nexus 10\n" +
        "               Nexus 4\n" +
        "               Nexus 5\n" +
        "               Nexus 5X\n" +
        "               Nexus 6\n" +
        "               Nexus 6P\n" +
        "               Nexus 7\n" +
        "               Nokia Lumia 520\n" +
        "               Nokia N9\n" +
        "               Pixel 2\n" +
        "               Pixel 2 XL\n" +
        "               Pixel 3\n" +
        "               Pixel 4\n" +

        "EJEMPLOS:\n" +
        "  " + nodeExec + " " + scriptPath + " https://www.insuit.net/\n" +
        "  " + nodeExec + " " + scriptPath + " https://www.insuit.net/ sleepTimeout=500\n" +
        "  " + nodeExec + " " + scriptPath + " https://www.insuit.net/ browserWidth=1280 browserHeight=720 sleepTimeout=500\n" +
        "  " + nodeExec + " " + scriptPath + " https://www.insuit.net/ sleepTimeout=500 browserHeight=720 browserWidth=1280 responseTimeout=20000\n";
        "  " + nodeExec + " " + scriptPath + " https://www.insuit.net/ sleepTimeout=500 'device=iPhone 11 landscape' responseTimeout=20000\n";
    console.error(HELP);
}

function isParam(param, paramName) {
    if (param.startsWith(paramName + "=")) {
        return true;
    }
    return false;
}

function isSleepTimeoutParam(param) {
    return isParam(param, "sleepTimeout");
}

function isResponseTimeoutParam(param) {
    return isParam(param, "responseTimeout");
}

function isBrowserWidthParam(param) {
    return isParam(param, "browserWidth");
}

function isBrowserHeightParam(param) {
    return isParam(param, "browserHeight");
}

function isLocaleParam(param) {
    return isParam(param, "locale");
}

function isDeviceParam(param) {
    return isParam(param, "device");
}

function getIntValue(param) {
	const strValue = getStringValue(param);
    return parseInt(strValue);
}
function getStringValue(param) {
    const strValue = param.split("=")[1];
    return strValue;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getConfig(localeLang) {
	var config = {};
	if (localeLang != "en") {
		var locale = {};
		// Ruta absoluta dentro del contenedor
		var localeFiles = glob.sync(path.join('/puppeteer/locales', '*.json'));
		var localeFile;
		var localeFileName;
		var localeFileLang;
		var localeData;
		var isValidLocale = false;
		var msg = "Idiomas disponibles: en";
		for (i=0; i<localeFiles.length; i++) {
			localeFile = localeFiles[i];
			localeFileName = path.basename(localeFile);
			localeFileLang = localeFileName.split(".")[0];
			msg = msg + ", " + localeFileLang;
			if (localeLang === localeFileLang) {
				isValidLocale = true;
			    localeData = fs.readFileSync(localeFile, 'utf-8');
			    locale = JSON.parse(localeData);
			}
		}
		msg = msg + ".";
		console.log(msg);
		if (isValidLocale) {
			config = {"locale": locale};
		} else {
			console.error("Valor de 'locale' inválido. No se usa locale (es decir, se usa el inglés).");
		}
		
	}
	return config;
}

function checkDevice(inputDevice) {
	let trimmedInputDevice = inputDevice.trim();
	if (trimmedInputDevice === "") {
		return ""
	}
	
	let i, emuDev;
	for (i=0; i<EMULATED_DEVICES.length; i++) {
		emuDev = EMULATED_DEVICES[i];
		if (trimmedInputDevice === emuDev) {
			return emuDev;
		}
	}

	console.error("Valor de 'device' inválido. No se usa device (se usa el chrome de un ordenador). Valor: " + inputDevice);
	return "";
}

function getBrowser(emulatedDevice, browserWidth, browserHeight) {
	const arg_array = ['--start-maximized', '--disable-gpu', '--ignore-certificate-errors', '--disable-extensions', '--no-sandbox', '--disable-dev-shm-usage'];
	
	if (emulatedDevice === "") {
	    // dispositivo emulado: no le ponemos las dimensiones
		return puppeteer.launch({
            headless: BROWSER_HEADLESS,
            args: arg_array,
            devtools: DEVTOOLS
        });
	}
	
	// Chrome de un ordenador
	return puppeteer.launch({
        headless: BROWSER_HEADLESS,
        defaultViewport: { width: browserWidth, height: browserHeight },
        args: arg_array
    });
}

function getFilteredLinks(mainUrl, links) {
    // Obtenemos el dominio principal
    const domain = new URL(mainUrl).host

	const validUrls = new Set(); // Un set para evitar repeticiones
    let urlDomain;
    let link;
    for (i = 0; i < links.length; i++) {
		link = links[i];
    	// console.log('Link: ' + link);
        // Sólo URLs que empiezan por http(s), para eliminar los "mailto: y similares"
        if (link.toLowerCase().startsWith("http")) {
            // Sólo las del mismo dominio
            urlDomain = new URL(link).host;
            if (domain === urlDomain) {
				link = link.split('#')[0]; // Si la URL incluye un "anchor", lo quitamos
                validUrls.add(link);
            }
        }
    }
    const validUrlArray = Array.from(validUrls); // Se devuelve como un array
    return validUrlArray;
}

async function  useWebPageAnalyser (params) {
    try {
        let command = "";
        for (let i = 0; i < params.length; i++) {
            command = command + " " + params[i];
        }
console.log(command)
        // https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program
            // El primer elemento es "node", el segundo el nombre del JS a ejecutar, a partir del tercero son los parámetros.
            const numberOfParams = params.length - 2;
            if (numberOfParams < 1) {
                this.help(params[0], params[1]);
            //     process.exit(EXIT_NO_DOMAIN_PARAM);
                throw new Error('EXIT_NO_DOMAIN_PARAM')
            }

            const url = params[2];
            console.log('Parámetros: url=' + url);

            // Valores por defecto si no se cambian en los parámetros de entrada
            let sleepTimeout = SLEEP_TIMEOUT;
            let responseTimeout = RESPONSE_TIMEOUT;
            let browserWidth = BROWSER_WIDTH;
            let browserHeight = BROWSER_HEIGHT;
            let localeLang = LOCALE;
            let emulatedDevice = EMULATED_DEVICE;

            let param;
            for (let i = 3; i < params.length; i++) {
                param = params[i];
                if (isSleepTimeoutParam(param)) {
                    sleepTimeout = getIntValue(param);
                }
                if (isResponseTimeoutParam(param)) {
                    responseTimeout = getIntValue(param);
                }
                if (isBrowserWidthParam(param)) {
                    browserWidth = getIntValue(param);
                }
                if (isBrowserHeightParam(param)) {
                    browserHeight = getIntValue(param);
                }
                if (isLocaleParam(param)) {
                    localeLang = getStringValue(param);
                    localeLang = localeLang.toLowerCase();
                }
                if (isDeviceParam(param)) {
                    emulatedDevice = getStringValue(param);
                    emulatedDevice = checkDevice(emulatedDevice);
                }
            }
            console.log('Parámetros: sleepTimeout=' + sleepTimeout);
            console.log('Parámetros: responseTimeout=' + responseTimeout);
            console.log('Parámetros: browserWidth=' + browserWidth);
            console.log('Parámetros: browserHeight=' + browserHeight);
            console.log('Parámetros: locale=' + localeLang);
            console.log('Parámetros: device=' + emulatedDevice);

            console.log('Antes de abrir el navegador.');

        // Indicamos configuración del navegador (dimensiones, etc.)
        const browser = await getBrowser(emulatedDevice, browserWidth, browserHeight);

        console.log('Antes de abrir la pestaña.');

        const page = await browser.newPage();

		const browserVersion = await page.browser().version();
		console.log('Versión del navegador: ' + browserVersion);
		
        if (emulatedDevice != "") {
            console.log('Antes de emular en la página el dispositivo: ' + emulatedDevice);
            const puppeteerDevice = puppeteer.devices[emulatedDevice]
            await page.emulate(puppeteerDevice);
        } else {
			// Parece que el defaultViewport al lanzar el puppeteer no acaba de funcionar bien,
			// lo ponemos aquí otra vez
			await page.setViewport({ width: browserWidth, height: browserHeight });
			const viewPort = page.viewport();
			console.log('Viewport de la página: ' + viewPort.width + 'x' + viewPort.height);	
		}

        await page.setBypassCSP(true);
        
        /*
        // Si se descomenta esta llamada, se puede usar console.log dentro de await page.evaluate() y similares. 
        page.on('console', async (msg) => {
			const msgArgs = msg.args();
			for (let i = 0; i < msgArgs.length; ++i) {
				console.log(await msgArgs[i].jsonValue());
			}
		});
		*/

        console.log('Antes de navegar a: ' + url);

        const response = await page.goto(url,
            // https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagegotourl-options
            {
                waitUntil: "networkidle2", // Espera hasta el evento indicado
                timeout: responseTimeout
            });

        console.log('Respuesta=' + response.status());
		// Si hay redirecciones, esta es la URL final
        const finalUrl = response.url();
        console.log('URL final (después de redirecciones)=' + finalUrl);

        if (!response.ok()) {
            process.exit(EXIT_RESPONSE_NO_OK);
        }

        if (sleepTimeout != SLEEP_TIMEOUT) {
            console.log('Antes del timeout de ' + sleepTimeout + ' ms.');

            // Un time-out adicional, para asegurar que todo se ha ejecutado
            await page.waitForTimeout(sleepTimeout);
        }

		console.log('Antes de la comprobación de que es HTML.');
		const isHtml = await page.evaluate(() => {
			var isNotOnlyElem = true;
			
			// 1) Chrome añade tags de HTML a la response de la URL de una imagen, para mostrarlo como un HTML
			//    cuyo único contenido en el body es un <img>
			// 2) Chrome añade tags de HTML a la response de la URL de un JS o un CSS, para mostrarlo como un HTML
			//    cuyo único contenido en el body es un <pre>
            const onlyElem = document.querySelector('html > body > pre:only-child, html > body > img:only-child');
			if (onlyElem) {
				isNotOnlyElem = false;
			}
			
            return Promise.resolve(isNotOnlyElem);
        });
		if (!isHtml) {
            process.exit(EXIT_RESPONSE_NO_HTML);
        }

        console.log('Antes del análisis de axe-core.');

		const config = getConfig(localeLang);
        // Indicamos sólo las reglas de WCAG
        const analysis = await new AxePuppeteer(page)
            .configure(config)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

		await sleep(DELAY);

        console.log('Antes de obtener las URLs de los enlaces.');
        const links = [];
        const ls = await page.$$('a[href]');
		  if (ls) {
			for (l of ls) {
				const lHref = await page.evaluate(link => link.href, l);
				links.push(lHref);
			}
		  }
        // console.log(links);
        const filteredLinks = getFilteredLinks(url, links)

		console.log('Antes de obtener el "title" de la página.');
        const pageTitle = await page.evaluate(() => {
			let pageTitle = "";
            const pageTitleElem = document.querySelector('html > head > title');
			if (pageTitleElem) {
				pageTitle = pageTitleElem.text.trim();
			}
			
            return Promise.resolve(pageTitle);
        });

        let jsonObj = {"axe-analysis": analysis, "links": filteredLinks , "page-title": pageTitle, "final-url": finalUrl};
		// JSON con pretty, para hacerlo legible
        let jsonStr = JSON.stringify(jsonObj, null, 2);
        console.log('###+++###+++###' + jsonStr + '###---###---###');
		// Damos tiempo a que se escriba en la consola de salida todo el contenido
		await sleep(DELAY);
		
		if (!BROWSER_HEADLESS && DEVTOOLS) {
			// Holds the browser until we terminate the process explicitly
			await browser.waitForTarget(() => false);
		}
        await page.close();
        await browser.close();

        return jsonStr;

    } catch (exception) {
        console.error(exception);
        process.exit(EXIT_GENERIC_ERROR);
    }
}



module.exports['useWebPageAnalyser'] = useWebPageAnalyser; 

