Ext.require(['Ext.ux.IFrame']);


Ext.onReady(function() {

    Ext.define('Company', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'company'},
            {name: 'price', type: 'float'},
            {name: 'change', type: 'float'},
            {name: 'pctChange', type: 'float'},
            {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},
            {name: 'industry'},
            {name: 'desc'}
         ]
    });

    Ext.grid.dummyData = [
        ['3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
        ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
        ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
        ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am', 'Manufacturing'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer'],
        ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am', 'Medical'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am', 'Food'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am', 'Retail'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am', 'Manufacturing'],
        ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am', 'Computer'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am', 'Services'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am', 'Retail'],
        ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am', 'Services']
    ];

 // add in some dummy descriptions
    for(var i = 0; i < Ext.grid.dummyData.length; i++){
        Ext.grid.dummyData[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. ');
    }


    Ext.QuickTips.init();

    var getLocalStore = function() {
        return Ext.create('Ext.data.ArrayStore', {
            model: 'Company',
            data: Ext.grid.dummyData
        });
    };

    var modelStore = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: "可视分析", expanded:true,children:[
                    {text:"航天理想可视分析工具",leaf:true},
                    {text:"社交关系聚类工具",leaf:true},
                    {text:"月交易额分析柱状图",leaf:true}
                    ]},
                { text: "POS机战法", expanded: true, children: [
                    { text: "基本情况分析", leaf: true },
                    { text: "信用卡月交易额", leaf: true}
                ] },
                { text: "通用分析战法", expanded: true, children: [
                    { text: "卡号情况分析", leaf: true },
                    { text: "通话记录基本情况分析", leaf: true}
                ] },
                {text: "自建战法模型",expanded:true,children:[
                    {text:"自建战法1",leaf:true},
                    {text:"自建战法2",leaf:true},
                    {text:"自建战法3",leaf:true}
                ]},
            ]
        },
        
    });

    var modelCentre = Ext.create('Ext.tree.Panel', {
        store: modelStore,
        rootVisible:false,
        autoScroll:true,
        //enableDragDrop: true,
        //stripeRows: true,
        title:'模型中心',
        viewConfig:{
            plugins:{
                ptype :'treeviewdragdrop',
                appendOnly:true //加上这个叶子节点之间拖拽时，会弹出图形警告。
            }
        },
        listeners:{
            itemclick :function(view,re){
                if (re.data.leaf === true) {
                    var tab = Ext.create('Ext.ux.IFrame',{
                        xtype:'uxiframe',
                        title:re.data.text,
                        closable:true,
                        layout:'fit',
                        autoScroll:true,
                        src:'http://www.sohu.com'
                    });

                    var grid3 = Ext.create('Ext.grid.Panel', {
                        store: getLocalStore(),
                        columns: [
                            Ext.create('Ext.grid.RowNumberer'),
                            {text: "Company", flex: 1, sortable: true, dataIndex: 'company'},
                            {text: "Price", width: 120, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                            {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
                            {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
                            {text: "Last Updated", width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
                        ],
                        columnLines: true,
                        title:'Grid with Numbered Rows',
                        closable:true,
                        layout:'fit',
                        autoScroll:true,
                        dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            items:[{
                                xtype: 'button',
                                text: '打开',
                                handler:function(){

                                }
                            }]
                        }],
                        bbar: Ext.create('Ext.PagingToolbar', {
                            store: getLocalStore(),
                            displayInfo: true,
                            displayMsg: 'Displaying topics {0} - {1} of {2}',
                            emptyMsg: "No topics to display",
                            items:[
                                '-', {
                                text: 'Show Preview',
                                pressed: true,
                                enableToggle: true,
                                toggleHandler: function(btn, pressed) {
                                    var preview = Ext.getCmp('gv').getPlugin('preview');
                                    preview.toggleExpanded(pressed);
                                }
                            }]
                        }),
                    });

                    tabPage.add(grid3).show();
                  
                };
            }
        }
    });

    var saveStore = Ext.create('Ext.data.Store', {
        fields:['check','fileName', 'saveTime'],
        data:[
            {fileName:"可视化图_1", saveTime:"01/10/2004"},
            {fileName:"POS套现商户分析", saveTime:"04/01/2004"},
            {fileName:"商户月交易额分析", saveTime:"02/22/2006"},
            {fileName:"可疑账户", saveTime:"06/10/2007"}]
    });


    var saveCentre = Ext.create('Ext.grid.Panel', {
        title: '结果中心',
        autoScroll:true,
        store: saveStore,
        dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            items:[
            {
                xtype: 'button',
                text: '打开',
                handler:function(){

                }
            },{
                xtype: 'button',
                text: '删除',
                handler: function(){
                    //判断是否有选中的
                    var temp = false;
                    for(var i = 0;i<saveStore.getCount();i++){
                        if (saveStore.getAt(i).data.check==true) {
                            temp = true;
                            break;
                        };
                    }

                    if(temp){
                        Ext.Msg.confirm("警告", "确定要删除吗？删除结果不可恢复", function (button) {
                            if (button == "yes") {
                                for(var i = 0;i<saveStore.getCount();i++){
                                    if (saveStore.getAt(i).data.check==true) {
                                        saveStore.removeAt(i);
                                        i--;
                                    }
                                }
                            }
                        });
                    }else{
                        Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
                    }    
                }
            }]
        }],
        columns: [
            {text:'选取',dataIndex:'check',xtype: 'checkcolumn',width:50},
            {text: '文件名',  dataIndex:'fileName'},
            {text: '存储时间',  dataIndex:'saveTime'},
        ],
    });
   
    //中间tabpage
    var tabPage = Ext.create('Ext.tab.Panel',{
        alias : 'widget.tabpanel',
        region: 'center',
        id: 'centerPanel',
        closeAction: 'destroy',
        items:[
        // {
        //     xtype: 'uxiframe',
        //     id:'tab_1',
        //     title:'主页',
        //     iconCls: 'home',
        //     autoScroll : true,
        //     loadMask: '页面载入中',
        //     src: 'http://localhost/pos/welcome/posVisualizationSearch' 
        // }
        ]
    });


    //本案数据
    var caseData = Ext.define('KitchenSink.view.layout.Accordion', {
        extend: 'Ext.panel.Panel',
        title: '本案数据',
        xtype: 'layout-accordion',
        layout: 'accordion',   
        
        initComponent: function() {
            Ext.apply(this, {
                items: [{
                    title: '人员基本信息',
                    html: 'Empty'
                }, {
                    title: '银行信息',
                    html: 'Empty'
                }, {
                    title: '网络交易信息',
                    html: 'Empty'
                }, {
                    title: '物流信息',
                    html: 'Empty'
                },{
                    title: '通话信息',
                    html: 'Empty'
                },{
                    title: 'QQ信息',
                    html: 'Empty'
                },{
                    title: '关联信息',
                    html: 'Empty'
                }]
            });
            this.callParent();
        }
    });

    //左侧数据中心
    var dataCentre = Ext.create('Ext.tab.Panel',{
        xtype: 'tabpanel',
        region: 'west',
        title: '数据中心',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items:[{
                xtype: 'textfield',
                width: 120,
            },{
                xtype: 'button',
                text: '查询'
            },{
                xtype: 'button',
                text: '打开'
            }]
        }],
        animCollapse: true,
        collapsible: true,
        split: true,
        width: 260, 
        activeTab: 0,
        tabPosition: 'bottom',
        items: [
            caseData,
        {
            title: '资源库数据',
        }]
    });

    //右侧分析中心
    var analysisCentre = Ext.create('Ext.tab.Panel',{
        xtype: 'tabpanel',
        region: 'east',
        title: '分析中心',
        animCollapse: true,
        collapsible: true,
        split: true,
        width: 260, 
        activeTab: 0,
        tabPosition: 'bottom',
        items: [modelCentre,
        saveCentre]
    });

    var viewPort = Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true,
        },
        items: [
        dataCentre
        ,tabPage
        ,analysisCentre
        ]
    });
});