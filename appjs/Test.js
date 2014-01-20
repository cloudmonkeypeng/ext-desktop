 Ext.define('MyDesktop.Test', {

 	extend: 'Ext.ux.desktop.Module',


    id:'zhangpeng-test',  


 	init : function(){
        this.launcher = {
            text: '在线查控',
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
                title:'在线插孔',
                iconCls:'icon-grid',
                id:'zhangpeng-test',     //没有id会出现多个
                //html : '<frame src="www.baidu.com" scolling="no" noresize="noresize"/>',
                html:'<iframe src="http://localhost/DataVisual/test/force_directed.html" width="100%" height="100%" scrolling="yes"><iframe>',
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();  //不加会少东西。。
        return win;
    }


 });