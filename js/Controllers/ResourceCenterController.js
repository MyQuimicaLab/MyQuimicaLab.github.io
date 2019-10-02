class ResourceCenterController {
    constructor(resourceCenterCollection) {
        this.resourceCenterCollection = resourceCenterCollection;
    }

    increment(resourceCenterName, valueToIncrement) {
        resourceCenterName = resourceCenterName.toLowerCase();

        let correspondentResourceCenter = this.resourceCenterCollection.filter(rc => rc.getResourceID() == resourceCenterName)[0];

        if(!isNaN(valueToIncrement) && correspondentResourceCenter) {
            correspondentResourceCenter.incrementResourceAmount(Math.ceil(valueToIncrement));
            let resourceAmountContainer = document.querySelector("ul li p[name='rc_" + resourceCenterName + "']");

            resourceAmountContainer.innerHTML = correspondentResourceCenter.getResourceAmount();
        }
    }

    decrease(resourceCenterName, valueToIncrement) {
        this.increment(resourceCenterName, -valueToIncrement);
    }

    updateResourceCenterUI(resourceCenterName) {

    }

    
}