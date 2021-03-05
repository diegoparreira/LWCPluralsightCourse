import { LightningElement, track } from 'lwc';

export default class MyFirstLWC extends LightningElement {
    @track searchTerm;

    handleNewSearch(event) {
        this.searchTerm = event.target.value;
    }
}