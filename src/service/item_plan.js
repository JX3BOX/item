import { $helper, $cms } from "@jx3box/jx3box-common/js/https";

const qs = require("qs");

function get_item_plan(plan_id) {
	return $helper().get(`api/item_plan/${plan_id}`);
}

function get_item_plans(params) {
	return $helper().get(`api/item_plans`, {
		params,
	});
}

// 获取我的清单
function get_my_item_plans(params) {
	return $helper().get(`api/my/item_plans`, {
		params,
	});
}

// 提交物品清单
function save_item_plan(params) {
	let action = params.id ? "update" : "create";
	let data = { action: action, plan: params };

	return $helper()({
		method: "POST",
		url: `/api/item_plan`,
		data: qs.stringify(data),
	});
}

function delete_item_plan(plan_id) {
	return $helper().put(`api/item_plan/remove`, { plan_id });
}

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
function postMyPlans(id, params) {
	return $cms().put(`/api/cms/app/item_plan/${id}`, params);
}

export { get_item_plan, get_item_plans, get_my_item_plans, delete_item_plan, save_item_plan, getItemPlans, getItemPlanID, delItemPlans, searchItemsID, getMyPlans, postMyPlans };
