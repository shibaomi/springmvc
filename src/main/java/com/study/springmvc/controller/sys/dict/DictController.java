package com.study.springmvc.controller.sys.dict;

import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.study.springmvc.common.db.page.QueryCondition;
import com.study.springmvc.common.utils.Page;
import com.study.springmvc.dal.model.DictModel;
import com.study.springmvc.service.faces.DictService;

@Controller
@RequestMapping(value = "sys/dict")
public class DictController {
	
	@Autowired
	private DictService dictService;
	
	/***
	 * 数据字典分页查询
	 * @param locale
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "queryPageDictModel")
	@ResponseBody
	public Page<DictModel> getSysMenuList(@ModelAttribute("SpringWeb")QueryCondition query,
			Locale locale, Model model) {
		Page<DictModel> page=dictService.queryPageDictModel(query);
		return page;
	}
}
