package com.join.base.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "produto")
public class Product {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_produto")
    @SequenceGenerator(name = "seq_produto",  sequenceName = "seq_produto", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_setor", nullable = false)
    private Sector setor;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    public Product(Sector setor, String nome) {
    	this.setor = setor;
    	this.nome = nome;
    }

}
