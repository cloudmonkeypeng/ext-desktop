/**
 * 资金智能分析基本表格的分页框
 * @author Peng
 */
Ext.define('Ext.ux.CommonPagingToolbar', {
	extend:'Ext.PagingToolbar',
    displayInfo: true,
    displayMsg: '当前显示第 {0} - {1} 条，总共 {2}条',
    emptyMsg: "没有数据"
});