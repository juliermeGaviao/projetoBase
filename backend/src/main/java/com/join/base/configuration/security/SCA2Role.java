package com.join.base.configuration.security;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SCA2Role implements GrantedAuthority {

	private static final long serialVersionUID = 3219276296294348723L;

	private String authority;

    @Override
    public String getAuthority() {
        return this.authority;
    }

}
