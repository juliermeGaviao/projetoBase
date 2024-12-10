package com.join.base.configuration;

import org.hibernate.collection.spi.PersistentCollection;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

	@Bean
	ModelMapper modelMapperBean() {
		ModelMapper modelMapper = new ModelMapper();

		// Não mapear os filhos @OneToMany
		modelMapper.getConfiguration().setPropertyCondition(context -> !(context.getSource() instanceof PersistentCollection));

		return modelMapper;
	}

}
