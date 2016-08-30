package com.study.springmvc.controller.authority.menu;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.springmvc.dal.model.MenuModel;
import com.study.springmvc.dal.model.SysInfo;
import com.study.springmvc.service.faces.MenuService;

import lombok.extern.slf4j.Slf4j;
/**
 * 菜单管理控制层类
 * @author shibaomi
 */
@Slf4j
@Controller
@RequestMapping(value = "authority/menu")
public class MenuController {
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(value = "save", method = RequestMethod.POST)
	public String home(@ModelAttribute("SpringWeb")MenuModel menu,Locale locale, Model model) {
		log.info("Welcome home! The client locale is {}.", locale);
		try {
			log.info("start");
			menu.setId(new Date().getTime()+"");
			this.menuService.addDictModel(menu);
			log.info("end");
		} catch (Exception e) {
			log.info("end1");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "{test:'test',test1:'test1'}";
	}
	
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public SysInfo getSysMenuList(Locale locale, Model model) {
		log.info("Welcome home! The client locale is {}.", locale);
		List<MenuModel> list=null;
		try {
			Map<String,Object> menu=null;
			log.info("start");
			if(menu==null){
				menu=new HashMap<String,Object>();
			}
			menu.put("sts", "0");
			menu.put("showSts", "0");
			list=this.menuService.queryListMenuModel(menu);
			log.info("end");
		} catch (Exception e) {
			log.info("end1");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		SysInfo sys=opertMenu(list);
		return sys;
	}
	
	public SysInfo opertMenu(List<MenuModel> menuList){
		SysInfo sys=new SysInfo();
		if(menuList==null||menuList.size()<1){
			return sys;
		}
		for(MenuModel menu:menuList){
			if(StringUtils.isEmpty(menu.getParentId())){
				sys.getChildMenu().add(menu);
			}else{
				boolean checkData=false;
				for(int i=0;i<menuList.size();i++){
					MenuModel m=menuList.get(i); 
					if(menu.getParentId().equals(m.getId())){
						m.getChildMenu().add(menu);
						checkData=true;
						break;
					}
					
				}
				if(!checkData){
					System.out.println("id="+menu.getId()+"的数据有误");
				}
			}
		}
		return sys;
	}
}


