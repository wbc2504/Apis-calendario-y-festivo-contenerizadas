package calendariolaboral.api.infraestructura.repositorios;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import calendariolaboral.api.dominio.entidades.*;

public interface ICalendarioRepositorio extends JpaRepository<Calendario, Long> {

    @Query("SELECT c FROM Calendario c WHERE year(c.fecha) = :anio AND c.pais.id = :idPais")
    public List<Calendario> listarPorAnio(@Param("idPais") int idPais, @Param("anio") int anio);

    @Query("SELECT c FROM Calendario c WHERE c.fecha = :fecha AND c.pais.id = :idPais")
    public Calendario obtener(@Param("idPais") int idPais, @Param("fecha") Date fecha);

}
