package com.join.base.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "setor")
public class Sector {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_setor")
    @SequenceGenerator(name = "seq_setor",  sequenceName = "seq_setor", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @OneToMany(mappedBy = "setor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Product> productList = new ArrayList<>();

    public Sector(String nome) {
    	this.nome = nome;
    }

    public Sector(Long id, String nome) {
    	this.id = id;
    	this.nome = nome;
    }

}
