import { $helper, $cms } from "@jx3box/jx3box-common/js/https";


// 获取列表
function getItemPlans(params) {
	return $cms()
		.get(`/api/cms/app/item_plans`, { params })
		.then((res) => {
			return res.data.data;
		});
}
// 单个清单搜索
function getItemPlanID(id) {
	return $cms()
		.get(`/api/cms/app/item_plan/${id}`)
		.then((res) => {
			return res.data.data;
		});
}
// 删除清单
function delItemPlans(id) {
	return $cms().delete(`/api/cms/app/item_plan/${id}`);
}

// 多个清单搜索
function searchItemsID(params) {
	return $helper()
		.get(`/api/items`, { params })
		.then((res) => {
			return res.data.data;
		});
}
// 获取我的清单
function getMyPlans(params) {
	return $cms()
		.get(`/api/cms/app/item_plans/mine`, { params })
		.then((res) => {
			return res.data.data;
		});
}
function updatePlan(id, data) {
	return $cms().put(`/api/cms/app/item_plan/${id}`, data);
}

// 新增清单
function addMyPlan(data) {
	return $cms().post(`/api/cms/app/item_plan`, data);
}

export { getItemPlans, getItemPlanID, delItemPlans, searchItemsID, getMyPlans, updatePlan, addMyPlan };
