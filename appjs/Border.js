Ext.require(['*']);

Ext.onReady(function() {
    var cw;

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    function closeRegion (e, target, header, tool) {
        var panel = header.ownerCt;
        newRegions.unshift(panel.initialConfig);
        viewport.remove(panel);
    }

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

    var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [{
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
        }]
    });
});

Ext.define('Ext.example.RegionSetter', {
    extend: 'Ext.Component',
    xtype: 'regionsetter',
    style: 'font-size: 30px;',
    autoEl: {
        tag: 'table',
        cn: [{
            tag: 'tr',
            cn: [{
                tag: 'td',
                colspan: 3,
                align: 'center',
                cls: 'ux-arrow ux-arrow-up',
                //html: '&#9757;'
                html: '&#9650;'
            }]
        },{
            tag: 'tr',
            cn: [{
                tag: 'td',
                cls: 'ux-arrow ux-arrow-left',
                //html: '&#9756;'
                html: '&#9668;'
            },{
                tag: 'td',
                style: 'font-size: 120%',
                html: '&#9728;'
            },{
                tag: 'td',
                cls: 'ux-arrow ux-arrow-right',
                //html: '&#9758;'
                html: '&#9658;'
            }]
        },{
            tag: 'tr',
            cn: [{
                tag: 'td',
                colspan: 3,
                align: 'center',
                cls: 'ux-arrow ux-arrow-down',
                //html: '&#9759;'
                html: '&#9660;'
            }]
        }]
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
 