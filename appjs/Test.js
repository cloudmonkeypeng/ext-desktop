 Ext.define('MyDesktop.Test', {

 	extend: 'Ext.ux.desktop.Module',

 	id:'zhangpeng-test',

 	init : function(){
        this.launcher = {
            text: 'zhangpeng-test',
            iconCls:'icon-grid'
        };
    },

    createWindow: function(){
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow('zhangpeng-test');
        if(!win){
        	win = desktop.createWindow({
                width:640,
                height:480,
                html : '<p>zhangpeng-test is here.</p>',
                animCollapse:false,
                constrainHeader:true
            });
        }
        return win;
    }


 });