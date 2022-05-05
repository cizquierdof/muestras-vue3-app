/***********************************
 * @fileoverview - Scrapping store
 * @author - Carlos Izquierdo
 * 
 */
import { defineStore } from "pinia";
//import puppeteer from "puppeteer";

export const useScrappingStore = defineStore({
    id: "scrapping",
    state: () => ({
        url:'',

    }),
    getters: {
        
    },
    actions: {
        async getPage(url) {
            const browser = await puppeteer.launch({
                headless: false,
                defsultViewport: null,
                devtools:false,
            });
            const page = await browser.newPage();
            await page.goto(url);
            //const html = await page.content();
            //await browser.close();
            //return html;
        }
    },
});
