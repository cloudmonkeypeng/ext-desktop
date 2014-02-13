Ext.define('MyDesktop.WindowFrame', {

 	extend: 'Ext.ux.desktop.Module',

    requires: ['Ext.Viewport'],

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

  /*  onReady:function(){
        var cw;

        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

        // function closeRegion (e, target, header, tool) {
        //     var panel = header.ownerCt;
        //     newRegions.unshift(panel.initialConfig);
        //     viewport.remove(panel);
        // }

        var newRegions = [{
                region: 'north',
                title: 'North 2',
                height: 100,
                collapsible: true,
                weight: -120
            }, {
                region: 'east',
                title: 'East 2',
                width: 100,
                collapsible: true,
                weight: -110
            }, {
                region: 'west',
                title: 'West 2',
                width: 100,
                collapsible: true,
                weight: -110
        }];
    },*/


    createWindow: function(){
         var cw;

        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

        // function closeRegion (e, target, header, tool) {
        //     var panel = header.ownerCt;
        //     newRegions.unshift(panel.initialConfig);
        //     viewport.remove(panel);
        // }

        var newRegions = [{
                region: 'north',
                title: 'North 2',
                height: 100,
                collapsible: true,
                weight: -120
            }, {
                region: 'east',
                title: 'East 2',
                width: 100,
                collapsible: true,
                weight: -110
            }, {
                region: 'west',
                title: 'West 2',
                width: 100,
                collapsible: true,
                weight: -110
        }];


    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
        	win = desktop.createWindow({
                width:1000,
                height:500,
                title:this.config.text,
                iconCls:this.config.smallIcon,
                id:this.id, 
                html:'<iframe frameborder="0" src="http://localhost/ext-desktop/layout.html" width="100%" height="100%" scrolling="yes"><iframe>',
                animCollapse:false,
                constrainHeader:true,
                layout: {
                    type: 'border',
                    padding: 5
                },
                defaults: {
                    split: true
                },
                /*items: [{
                    region: 'west',
                    collapsible: true,
                    layout: 'absolute',
                    title: 'Starts at width 30%',
                    split: true,
                    width: '30%',
                    minWidth: 100,
                    minHeight: 140,
                    bodyPadding: 10,
                    stateId: 'westRegion',
                    stateful: true,
                    html: '<div style="position:absolute;bottom:10px;right:10px;">'+
                            'west<br>I am floatable and stateful!</div>',
                    items: [{
                        xtype: 'regionsetter'
                    }]
                },{
                    region: 'center',
                    //html: 'center center',
                    title: 'Center',
                    minHeight: 80,
                }]*/
            });
            win.show();
         }else{
            win.focus();
        }
        return win;
    },


    afterRender: function () {
        this.callParent();
        
        this.ownerCt.on({
            changeregion: 'onChangeRegion',
            scope: this
        });
        this.onChangeRegion(this.ownerCt);

        this.el.on({
            click: this.onClick,
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut,
            scope: this
        });
    },

    onClick: function (e) {
        var target = Ext.fly(e.getTarget());
        var region;

        if (target.hasCls('ux-arrow-up')) {
            region = 'north';
        } else if (target.hasCls('ux-arrow-left')) {
            region = 'west';
        } else if (target.hasCls('ux-arrow-right')) {
            region = 'east';
        } else if (target.hasCls('ux-arrow-down')) {
            region = 'south';
        }

        if (region && region !== this.ownerCt.region) {
            this.ownerCt.setBorderRegion(region);
        }
    },

    onMouseOver: function (e) {
        var target = Ext.fly(e.getTarget());
        if (target.hasCls('ux-arrow')) {
            target.addCls('ux-arrow-over');
        }
    },

    onMouseOut: function (e) {
        var target = Ext.fly(e.getTarget());
        target.removeCls('ux-arrow-over');
    },

    onChangeRegion: function (panel, oldRegion) {
        if (oldRegion) {
            this.removeCls('ux-arrow-current-' + oldRegion);
        }
        this.addCls('ux-arrow-current-' + panel.region);

    }
});