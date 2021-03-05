import { LightningElement, track, wire } from "lwc";
// track decorator serve para trackear variáveis que precisam ser rastreadas para mudanças
import searchLeads from "@salesforce/apex/LeadSearchController.searchLeads";
// importação da função que buscara dados no Salesforce

const COLS = [{
        label: "Name",
        fieldName: "Name",
        type: "text"
    },
    {
        label: "Title",
        fieldName: "Title",
        type: "text"
    },
    {
        label: "Company",
        fieldName: "Company",
        type: "text"
    },
    {
        label: "View",
        type: "button-icon",
        initialWidth: 75,
        typeAttributes: {
            title: "View Details",
            alternativeText: "View Details",
            iconName: "action:info"
        }
    }
];

export default class LeadList extends LightningElement {
    @track leads = [];
    @track searchTerm = "";
    @track cols = COLS;
    @track error;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        const selectedEvent = new CustomEvent("newsearch", {
            detail: this.searchTerm
        });
        this.dispatchEvent(selectedEvent);
    }

    @wire(searchLeads, {
        searchTerm: "$searchTerm"
    })
    loadLeads({ error, data }) {
        if (data) {
            this.leads = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.leads = undefined;
        }
    }
}