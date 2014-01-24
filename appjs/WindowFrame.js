 Ext.define('MyDesktop.WindowFrame', {

 	extend: 'Ext.ux.desktop.Module',

    id:null, 

    config:null, 

    constructor:function(config){
        var me = this;
        me.id = config.id;

        me.config = config;
        me.callParent();
    },

    init:function(){
        this.launcher ={
            text : this.config.text,
            iconCls : this.config.smallIcon
        };
    },

    createWindow: function(){
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
        	win = desktop.createWindow({
                width:1000,
                height:500,
                title:this.config.text,
                iconCls:this.config.smallIcon,
                id:this.id, 
                html:'<iframe frameborder="0" src="'+this.config.url+'" width="100%" height="100%" scrolling="yes"><iframe>',
                animCollapse:false,
                constrainHeader:true,
            });
            win.show();
         }else{
            win.focus();
        }
        return win;
    }
 });