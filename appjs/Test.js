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
                width:1000,
                height:500,
                //html : '<frame src="www.baidu.com" scolling="no" noresize="noresize"/>',
                html:'<iframe src="http://localhost/DataVisual/test/force_directed.html" width="100%" height="100%" scrolling="yes"><iframe>',
                animCollapse:false,
                constrainHeader:true
            });
        }
        return win;
    }


 });