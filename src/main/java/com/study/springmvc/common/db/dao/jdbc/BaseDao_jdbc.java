package com.study.springmvc.common.db.dao.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;

import lombok.Getter;
import lombok.Setter;

public class BaseDao_jdbc {
	
	@Setter
	@Getter
	private JdbcTemplate jdbcTemplate;
}
