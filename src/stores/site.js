import { defineStore } from "pinia";

export const useSiteStore = defineStore({
  id: "site",
  state: () => ({
    pageTypes: [
      { text: "Página de inicio", value: "HOME" },
      { text: "Inicio de sesión", value: "SESSION_START" },
      { text: "Mapa web", value: "WEB_MAP" },
      { text: "Contacto", value: "CONTACT" },
      { text: "Ayuda", value: "HELP" },
      { text: "Legal", value: "LEGAL" },
      { text: "Servicio/Proceso", value: "SERVICE" },
      { text: "Búsqueda", value: "SEARCH" },
      {
        text: "Declaración de accesibilidad",
        value: "ACCESSIBILITY_DECLARATION",
      },
      { text: "Mecanismo de comunicación", value: "COMMUNICATION_MECHANISM" },
      { text: "Página tipo", value: "TYPICAL_PAGE" },
      { text: "Otras páginas", value: "OTHER" },
      { text: "Aleatoria", value: "ALEATORY" },
      { text: "Documento descargable", value: "DOWNLOADABLE_DOC" },
    ],
    //Parámetros del sitio
    siteName: "",
    siteDomain: "",
    //Inputs de las páginas
    inUrl: "",
    inType: "",
    inShortName: "",
    inBreadcrumb: "",
    //Array de páginas
    siteWebPages: [
     /*  {
        breadcrumb: "Inicio",
        shortName: "inicio",
        webPageType: "HOME",
        webPageUrl: "https://www.elche.es/",
      },
      {
        breadcrumb: "Inicio/acesibilidad",
        shortName: "accesibilidad",
        webPageType: "ACCESSIBILITY_DECLARATION",
        webPageUrl: "https://www.elche.es/accesibilidad",
      }, */
    ],
    editMode:false, //flag del modo edición
  }),

  /**********
   * GETTERS
   */
  getters: {
    /******************************************************
     * COMPROBACIONES PARA EL ESTATUS DE LA MUESTRA
     */
    //Número de urls de la muestra
    numUrl: (state) => {
      return state.siteWebPages.reduce((acc, e) => {
        if (e.webPageUrl !== "") acc++;
        return acc;
      }, 0);
    },

    //Número de páginas aleatorias
    numAleatory: (state) => {
      return state.siteWebPages.reduce((acc, e) => {
        e.webPageUrl && e.webPageType === "ALEATORY" ? acc++ : null;
        return acc;
      }, 0);
    },

    //¿Está la página de inicio?
    hasHome: (state) => {
      return state.siteWebPages.some(
        (e) => e.webPageType === "HOME" && e.webPageUrl
      );
    },

    //¿Está la Declaración de accesibilidad?
    hasDecAcc: (state) => {
      return state.siteWebPages.some(
        (e) => e.webPageType === "ACCESSIBILITY_DECLARATION" && e.webPageUrl
      );
    },

    //Genera Site Id = nombre del sitio sin espacios ni carácteres especiales
    siteId: function (state) {
      if (state.siteName)
        return state.siteName
          .toLowerCase()
          .replace(/ /g, "_")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
    },
  },

  /********************************************************
   * ACCIONES
   */
  actions: {
    //monta el objeto urlList que es el JSON que almacena toda la información de la muestra
    urlList() {
      return [
        {
          siteId: this.siteId,
          siteName: this.siteName,
          siteDomain: this.siteDomain,
          siteWebPages: this.siteWebPages,
        },
      ];
    },
    //Recuperando datos de localhost
    //TODO ampliar para que recupere de otros orígenes
    restoreSavedData() {
      try {
        const savedLocal = localStorage.getItem("saved-site");
        const parsed = JSON.parse(savedLocal);
        this.siteName = parsed[0].siteName;
        this.siteDomain = parsed[0].siteDomain;
        this.siteWebPages = [...parsed[0].siteWebPages];
      } catch {
        console.log("Se ha producido un error al recuprar datos");
      }
    },

    /**
     * GUARDAR TRABAJO EN LOCALSTORAGE
     */
    saveSite() {
      const parsed = JSON.stringify(this.urlList());
      localStorage.setItem("saved-site", parsed);
    },
    /*******
     * Organiza urlList
     */
    orden() {
      const ordered = [];
      this.pageTypes.forEach((pageType) => {
        this.siteWebPages.map((page) => {
          if (page.webPageType == pageType.value) {
            ordered.push(page);
          }
        });
      });
      this.siteWebPages = ordered;
      this.saveSite();
    },

    /***
     * RESET
     * Borrado de los datos del sitio
     */
    reset() {
      const borrar = confirm("Se van a borrar los datos");
      if (borrar) {
        this.siteName = "";
        this.siteDomain = "";
        this.siteWebPages = [];
        localStorage.setItem("saved-site", JSON.stringify(this.urlList));
        alert("¡Los datos se han borrado!");
      }
    },
    /***
     * BORRA UNA PÁGINA DE LA MUESTRA
     */
    deleteItem(index) {
      this.siteWebPages.splice(index, 1);
      this.saveSite();
    },
    /********
     * EDITA UNA PÁGINA DE LA MUESTTRA
     */
    //Pone en modo edición
    editItem(index) {
      this.editMode = true;
      this.indice = index;
      this.inUrl = this.siteWebPages[index].webPageUrl;
      this.inType = this.siteWebPages[index].webPageType;
      this.inShortName = this.siteWebPages[index].shortName;
      this.inBreadcrumb = this.siteWebPages[index].breadcrumb;
    },
    //guarda la página editada
    saveModified() {
      const i = this.indice;
      this.siteWebPages[i] = {
        webPageUrl: this.inUrl,
        webPageType: this.inType,
        shortName: this.inShortName,
        breadcrumb: this.inBreadcrumb,
      };
      this.indice = null;
      this.inUrl = "";
      this.inType = "";
      this.inShortName = "";
      this.inBreadcrumb = "";
      this.editMode = false;
      this.saveSite();
    },

    /**
     *  GUARDADO DEL FICHERO .BAT
     */
    saveBatch() {
      //crear el batch
      let urlBatch = "";
      this.siteWebPages.forEach((e) => {
        urlBatch +=
          'start chrome --new-tab- "' +
          decodeURI(e.webPageUrl) +
          '"\n' +
          "timeout /t 1\n";
      });

      const batchBlob = new Blob([urlBatch]);
      const batch = URL.createObjectURL(batchBlob); //crear una url que apunte al json
      const link = document.createElement("a"); //crea un enlace
      link.href = batch;
      link.download = "url_list.bat"; //apunta el enlace al json
      document.body.appendChild(link); //añade el link al body
      //despacha un evento click en el link
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      document.body.removeChild(link); //elimina el link del body
    },

    /**
     * SALVA EL JSON
     */
    saveJson() {
      //console.log(this.urlList());
      const parsed = JSON.stringify(this.urlList());
      const jsonBlob = new Blob([parsed]);
      const blobUrl = URL.createObjectURL(jsonBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "url_list.json";
      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      document.body.removeChild(link); //elimina el link del body
    },

    /**
     * AÑADE URL
     */
    addItem() {
      this.inUrl = this.inUrl.trim();
      const duplicates = this.siteWebPages.some(
        (e) => e.webPageUrl === this.inUrl
      );
      //Comprobación duplicados
      if (duplicates) {
        alert("¡URL Duplicada!");
      } else {
        const newPage = {
          webPageUrl: this.inUrl,
          webPageType: this.inType,
          shortName: this.inShortName,
          breadcrumb: this.inBreadcrumb,
        };

        this.siteWebPages.push(newPage);
        this.saveSite();
      }
    },
  },
});
