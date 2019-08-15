class TooltipController {

    constructor(scene, player, triggerCallback) {
        this._scene = scene;
        this._player = player;
        this._triggerCallback = triggerCallback;
        this._tooltips = [];
    }

    update() {
        
        for (let tooltip of this._tooltips) {
            if (this._triggerCallback(this._player, tooltip.group)) {
                
                if (tooltip.object == undefined || !tooltip.object.active) {
                    tooltip.object = this._scene.add.image(111, 300, tooltip.asset);
                }
            }
            else{

                if (tooltip.object != undefined && tooltip.object.active) {
                    tooltip.object.destroy();
                    
                }
            }
        }
    }

    addTooltipEvent(asset, watchedGroup) {

        if (!this._scene.textures.exists(asset))
            throw new Error("texture key '" + asset + "' doesn't exist.");

        let newTooltipEvent = {
            asset: asset,
            group: watchedGroup
        }

        this._tooltips.push(newTooltipEvent);
    }
}