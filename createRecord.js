import { LightningElement, track } from "lwc";

import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord } from "lightning/uiRecordApi";


import ACCOUNT_OBJECT from "@salesforce/schema/Account";


export default class CreateRecordExample extends LightningElement {
    inventoryRecord = {};
    isLoading = false;

    handleChange(event) {
        this.inventoryRecord[event.target.name] = event.target.value;
    }

    createInventory() {
        this.isLoading = true;
        const fields = this.inventoryRecord;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((inventory) => {
                this.inventoryID = inventory.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Asset logged successfully!",
                        variant: "success"
                    })
                );

                this.inventoryRecord = {};
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error creating record",
                        message: reduceErrors(error).join(", "),
                        variant: "error"
                    })
                );
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}