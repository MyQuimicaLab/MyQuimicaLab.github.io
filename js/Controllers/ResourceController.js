class ResourceController {
    constructor(resourceCollection, updateConditionCallback, conditionCallbackReference) {
        this.resourceCenterCollection = resourceCollection;
        if (updateConditionCallback != undefined)
            this.updateConditionCallback = updateConditionCallback.bind(conditionCallbackReference);
    }

    increment(resourceName, valueToIncrement = 1) {

        resourceName = resourceName.toLowerCase();

        let correspondentResourceCenter = this.resourceCenterCollection.filter(rc => rc.getResourceID() == resourceName)[0];

        

        if (this.updateConditionCallback != undefined && this.updateConditionCallback(resourceName)) {
            
            if(!isNaN(valueToIncrement) && correspondentResourceCenter) {
                correspondentResourceCenter.incrementResourceAmount(Math.ceil(valueToIncrement));
                let resourceAmountContainer = document.querySelector("ul li p[name='rc_" + resourceName + "']");
    
                resourceAmountContainer.innerHTML = correspondentResourceCenter.getResourceAmount();
                console.log("Resource " + resourceName + " incremented by " + valueToIncrement);
                
            }
        }
    }

    decrease(resourceCenterName, valueToIncrement = 1) {
        this.increment(resourceCenterName, -valueToIncrement);
    }
    
}