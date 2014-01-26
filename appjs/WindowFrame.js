 Ext.define('MyDesktop.WindowFrame', {

    extend: 'Ext.ux.desktop.Module',

    requires : [ 'Ext.ux.IFrame'],
    
    id:null,
    
    config:null,
    
    constructor: function (config) {
        var me = this;
        me.id=config.id;

        me.config=config;
        me.callParent();  
    },

    init : function(){
        this.launcher = {
            text: this.config.text,
            iconCls: this.config.smallIcon
        };
    },

    createWindow: function(){
        
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.config.id);
        if(!win){
            win = desktop.createWindow({
                width:1100,
                height:600,
                title:this.config.text,
                iconCls:this.config.smallIcon,  
                id:this.config.id,
                //html:'<a>放置在线查控</a>',
                //html:'<iframe src="dept/index.action" width="100%" height="100%" scrolling="yes"><iframe>',
               // html:'<iframe frameborder="0" src="home2014115.jsp" style="padding:2px"  width="100%" height="100%" scrolling="no"><iframe>',
               // html:'<iframe frameborder="0" src="'+ this.config.action+'" style="padding:2px"  width="100%" height="100%" scrolling="no"><iframe>',
                items: [
                        { 
                            xtype: 'uxiframe',
                            layout: 'fit',
                            src:this.config.url,
                            width:"100%",
                            height:"100%",
                            scrolling:"no",
                            loadMask: '页面加载中...',
                        }
                    ],
                animCollapse:false,
                constrainHeader:true
            });
            win.show();
        }else{
            win.focus();
        }
        return win;
    }


 });