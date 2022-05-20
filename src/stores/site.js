/*********************************
 * @description store para las transacciones de la muestra
 * @author Carlos Izquierdo
 *
 */
import { defineStore } from "pinia";
import { PAGE_TYPES } from "../config/config";

export const useSiteStore = defineStore({
  id: "site",
  state: () => ({
    pageTypes: PAGE_TYPES,
    //Parámetros del sitio
    siteName: "",
    siteDomain: "",
    //Inputs de las páginas
    inUrl: "",
    inType: "",
    inShortName: "",
    inBreadcrumb: "",
    //inClase: "", Calculado
    //Condicionales
    r5_2: false,
    r5_3: false,
    r5_4: false,
    r6: false,
    r7: false,
    herramientas_autor: false,
    documentacion: false,
    servicios_apoyo: false,
    siteWebPages: [], //Array de páginas
    editMode: false, //flag del modo edición
  }),

  /*****************************************************
   * GETTERS
   */

  getters: {
    /******************************************************
     * COMPROBACIONES PARA EL ESTATUS DE LA MUESTRA
     */
    Clase: (state) => {
      return state.inType === "DOWNLOADABLE_DOC"
        ? "DOCUMENTO_NO_WEB"
        : "PAGINA_WEB";
    },
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
    //monta el JSON que almacena toda la información de la muestra
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

    //Recuperando los datosdesde un json válido
    restoreData(json) {
      this.siteName = json.siteName;
      this.siteDomain = json.siteDomain;
      this.siteWebPages = [...json.siteWebPages];
    },

    //Restauración desde Local Storage
    restoreFromLocalStorage() {
      try {
        const savedLocal = localStorage.getItem("saved-site");
        const parsed = JSON.parse(savedLocal);
        this.restoreData(parsed[0]);
      } catch {
        console.log("Se ha producido un error al recuprar datos");
      }
    },

    //Recuperar json en disco y montarlo en el store

    restorFromDisk(json) {
      //console.log('json', json);
      this.restoreData(json[0]);
      this.saveSite();
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
    /**
     * AÑADE URL
     */
    addItem() {
      this.inUrl = this.inUrl.trim();
      const duplicates = this.siteWebPages.some(
        (e) => e.webPageUrl === this.inUrl
      );
      //Comprobación duplicados
      if (duplicates && !confirm("¿Añadir URL Duplicada?")) {
        return;
      } else {
        const newPage = {
          webPageUrl: this.inUrl,
          webPageType: this.inType,
          shortName: this.inShortName,
          breadcrumb: this.inBreadcrumb,
          clase: this.Clase,
          condiciones: {
            r5_2: this.r5_2,
            r5_3: this.r5_3,
            r5_4: this.r5_4,
            r6: this.r6,
            r7: this.r7,
            herramientas_autor: this.herramientas_autor,
            documentacion: this.documentacion,
            servicios_apoyo: this.servicios_apoyo,
          },
        };

        this.siteWebPages.push(newPage);
        this.saveSite();
      }
    },
    /***
     * BORRA UNA PÁGINA DE LA MUESTRA
     */
    deleteItem(index) {
      const borrar = confirm("¿Está seguro de borrar la línea?");
      if (!borrar) return;
      this.siteWebPages.splice(index, 1);
      this.saveSite();
    },
    /********
     * EDITA UNA PÁGINA DE LA MUESTTRA
     */
    //Pone en modo edición
    editItem(index) {
      this.editMode = confirm("¿Está seguro de editar la línea?");
      if (!this.editMode) return;
      this.indice = index;
      this.inUrl = this.siteWebPages[index].webPageUrl;
      this.inType = this.siteWebPages[index].webPageType;
      this.inShortName = this.siteWebPages[index].shortName;
      this.inBreadcrumb = this.siteWebPages[index].breadcrumb;
      //this.inClase = this.siteWebPages[index].clase;
      //this.condiciones = this.siteWebPages[index].condiciones;
      this.r5_2 = this.siteWebPages[index].condiciones.r5_2;
      this.r5_3 = this.siteWebPages[index].condiciones.r5_3;
      this.r5_4 = this.siteWebPages[index].condiciones.r5_4;
      this.r6 = this.siteWebPages[index].condiciones.r6;
      this.r7 = this.siteWebPages[index].condiciones.r7;
      this.herramientas_autor =
        this.siteWebPages[index].condiciones.herramientas_autor;
      this.documentacion = this.siteWebPages[index].condiciones.documentacion;
      this.servicios_apoyo =
        this.siteWebPages[index].condiciones.servicios_apoyo;
    },
    //guarda la página editada
    saveModified() {
      const i = this.indice;
      this.siteWebPages[i] = {
        webPageUrl: this.inUrl,
        webPageType: this.inType,
        shortName: this.inShortName,
        breadcrumb: this.inBreadcrumb,
        clase: this.Clase,
        condiciones: {
          r5_2: this.r5_2,
          r5_3: this.r5_3,
          r5_4: this.r5_4,
          r6: this.r6,
          r7: this.r7,
          herramientas_autor: this.herramientas_autor,
          documentacion: this.documentacion,
          servicios_apoyo: this.servicios_apoyo,
        },
      };
      //restaurando condiciones iniciales
      this.indice = null;
      this.inUrl = "";
      this.inType = "";
      this.inShortName = "";
      this.inBreadcrumb = "";
      this.r5_2 = false;
      this.r5_3 = false;
      this.r5_4 = false;
      this.r6 = false;
      this.r7 = false;
      this.herramientas_autor = false;
      this.documentacion = false;
      this.servicios_apoyo = false;

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
          'start chrome --new-tab- "' + e.webPageUrl + '"\n' + "timeout /t 1\n";
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
      //console.log(this.urlList()[0].siteWebPages);
      let parsed = "";
      const version = confirm("¿quieres versión 1");
      if (version) {
        const jsonv1 = [
          {
            siteId: this.urlList()[0].siteId,
            siteName: this.urlList()[0].siteName,
            siteDomain: this.urlList()[0].siteDomain,
            siteWebPages: [],
          },
        ];
        this.urlList()[0].siteWebPages.map((e) => {
          const url = {
            webPageUrl: e.webPageUrl,
            webPageType: e.webPageType,
            shortName: e.shortName,
            breadcrumb: e.breadcrumb,
          };
          jsonv1[0].siteWebPages.push(url);
        });
        parsed = JSON.stringify(jsonv1);
      } else {
        parsed = JSON.stringify(this.urlList());
      }

      alert(`Finalmente versión ${version}`);
      const jsonBlob = new Blob([parsed]);
      const blobUrl = URL.createObjectURL(jsonBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `url_list_v${version ? "1" : "2"}.json`;
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

    //Abrir url en nueva pestaña al hacer Ctrl+click en la tabla
    openUrl(url) {
      //const newWindow = window.open(url, '_blank', 'fullscreen=yes');
      //newWindow.focus();
      console.log(url);
      const newTab = window.open(url, "_blank", "");
      newTab.focus();
    },
    //Abrir la lista de url en nueva ventana
    openUrlList() {
      if (!confirm("No funciona en Chrome, ¿Continuar?")) return;

      const newWindow = [];
      this.siteWebPages.forEach((e, i) => {
        console.log(e.webPageUrl);
        newWindow[i] = window.open(e.webPageUrl, "_blank");
      });
    },
  },
});
