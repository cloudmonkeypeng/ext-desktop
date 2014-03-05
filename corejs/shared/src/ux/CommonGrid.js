/**
 * 资金智能分析基本表格
 * @author Peng
 */
Ext.define('Ext.ux.CommonGrid', {
    extend: 'Ext.grid.Panel',
    columnLines: true,
    layout:'fit',
    autoScroll:true,
    closable:true,
    loadMask:true,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            { xtype: 'button', text: '按钮 1' },
            { xtype: 'button', text: '按钮 2' },
            { xtype: 'button', text: '按钮 3' },
            { xtype: 'button', text: '按钮 4' },
            { xtype: 'button', text: '按钮 5' },
            { xtype: 'button', text: '按钮 6' }
        ]
    }]
});