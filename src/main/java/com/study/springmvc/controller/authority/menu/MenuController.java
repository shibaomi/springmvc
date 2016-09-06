package com.study.springmvc.controller.authority.menu;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.dal.model.SysInfo;
import com.study.springmvc.service.faces.MenuService;

/**
 * 菜单管理控制层类
 * @author shibaomi
 */
@Controller
@RequestMapping(value = "authority/menu")
public class MenuController {
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(value = "save", method = RequestMethod.POST)
	public String home(@ModelAttribute("SpringWeb")MenuModel menu,Locale locale, Model model) {
		this.menuService.saveOrUpdateMenuModel(menu);
		return "ok";
	}
	
	@RequestMapping(value = "queryList")
	@ResponseBody
	public Map<String,SysInfo> getSysMenuList(Locale locale, Model model) {
		Map<String,Object> menu=new HashMap<String,Object>();
		menu.put("sts", "0");
		menu.put("showSts", "0");
		Map<String,SysInfo> result=this.menuService.queryListSysMenu(menu);
		return result;
	}
}


