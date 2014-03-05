Ext.require(['Ext.ux.IFrame','Ext.ux.CommonGrid','Ext.ux.CommonPagingToolbar']);


Ext.onReady(function() {

    
    Ext.define('ForumThread', {
        extend: 'Ext.data.Model',
        fields: [
            'title', 'forumtitle', 'forumid', 'username',
            {name: 'replycount', type: 'int'},
            {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
            'lastposter', 'excerpt', 'threadid'
        ],
        idProperty: 'threadid'
    });



    var store = Ext.create('Ext.data.Store', {
        pageSize: 100,
        model: 'ForumThread',
        remoteSort: true,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: 'http://www.sencha.com/forum/topics-browse-remote.php',
            reader: {
                root: 'topics',
                totalProperty: 'totalCount'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
            property: 'lastpost',
            direction: 'DESC'
        }]
    });


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
                    // var tab = Ext.create('Ext.ux.IFrame',{
                    //     xtype:'uxiframe',
                    //     title:re.data.text,
                    //     closable:true,
                    //     layout:'fit',
                    //     autoScroll:true,
                    //     src:'http://www.sohu.com'
                    // });

                    var pageBar = Ext.create('Ext.ux.CommonPagingToolbar', {
                        store: store
                    });

                    columns = [
                         Ext.create('Ext.grid.RowNumberer',{
                            width:50
                         }),
                         {
                            // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
                            // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
                            // therefore the id will be registered in the ComponentManager and conflict. Need a way to
                            // add additional CSS classes to the rendered cells.
                            id: 'topic',
                            text: "Topic",
                            dataIndex: 'title',
                            flex: 1,
                            //renderer: renderTopic,
                            sortable: false
                        },{
                            text: "Author",
                            dataIndex: 'username',
                            width: 100,
                            //hidden: true,
                            sortable: true
                        },{
                            text: "Replies",
                            dataIndex: 'replycount',
                            width: 70,
                            align: 'right',
                            sortable: true
                        },{
                            id: 'last',
                            text: "Last Post",
                            dataIndex: 'lastpost',
                            width: 150,
                            //renderer: renderLast,
                            sortable: true
                        }];

                    var grid3 = Ext.create('Ext.ux.CommonGrid', {
                        store: store,
                        columns: columns,
                        title:'Grid with Numbered Rows',
                        bbar:pageBar
                    });
                    store.loadPage(1);
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