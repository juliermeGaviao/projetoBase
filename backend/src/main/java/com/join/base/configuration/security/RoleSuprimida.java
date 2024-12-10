package com.join.base.configuration.security;

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
public class RoleSuprimida {

    private String[] certificadoA3;
    private String[] govBrOuro;
    private String[] govBrPrata;

}
