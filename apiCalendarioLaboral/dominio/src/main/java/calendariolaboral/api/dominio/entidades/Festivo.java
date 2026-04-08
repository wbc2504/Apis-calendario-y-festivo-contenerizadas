package calendariolaboral.api.dominio.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "festivo")
public class Festivo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "secuencia_festivo")
    @SequenceGenerator(name = "secuencia_festivo", sequenceName = "secuencia_festivo", allocationSize = 1)
    @Column(name = "id")
    private int id;
    @Column(name = "nombre", length = 100)
    private String nombre;
    @Column(name = "dia")
    private int dia;
    @Column(name = "mes")
    private int mes;
    @Column(name = "diaspascua")
    private int diasPascua;

    @ManyToOne
    @JoinColumn(name = "idpais", referencedColumnName = "id")
    private Pais pais;

    @ManyToOne
    @JoinColumn(name = "idtipo", referencedColumnName = "id")
    private TipoFestivo tipo;

    public Festivo() {
    }



    public Festivo(int id, String nombre, int dia, int mes, int diasPascua, Pais pais, TipoFestivo tipo) {
        this.id = id;
        this.nombre = nombre;
        this.dia = dia;
        this.mes = mes;
        this.diasPascua = diasPascua;
        this.pais = pais;
        this.tipo = tipo;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDia() {
        return dia;
    }

    public void setDia(int dia) {
        this.dia = dia;
    }

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public int getDiasPascua() {
        return diasPascua;
    }

    public void setDiasPascua(int diasPascua) {
        this.diasPascua = diasPascua;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }



    public TipoFestivo getTipo() {
        return tipo;
    }



    public void setTipo(TipoFestivo tipo) {
        this.tipo = tipo;
    }



}
