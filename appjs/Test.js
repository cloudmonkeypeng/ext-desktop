 Ext.define('MyDesktop.Test', {

 	extend: 'Ext.ux.desktop.Module',

    id:null,  

    constructor:function(data){
        this.id = data;
        this.launcher = {
            text: this.id,
            iconCls:'icon-grid'
        };
    },

    createWindow: function(){
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
        	win = desktop.createWindow({
                width:1000,
                height:500,
                title:'在线插孔',
                iconCls:'icon-grid',
                id:this.id,     //没有id会出现多个
                //html : '<frame src="www.baidu.com" scolling="no" noresize="noresize"/>',
                html:'<iframe src="http://localhost/DataVisual/test/hello_world.html" width="100%" height="100%" scrolling="yes"><iframe>',
                //html:'<a>13123123</a>',
                animCollapse:false,
                constrainHeader:true
            });
         //    win.show();
         // }else{
         //    win.focus;
        }
        win.show();  //不加会少东西。。
        return win;
    }


 });