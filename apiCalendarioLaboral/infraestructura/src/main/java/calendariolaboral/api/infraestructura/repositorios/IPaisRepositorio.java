package calendariolaboral.api.infraestructura.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import calendariolaboral.api.dominio.entidades.*;

@Repository
public interface IPaisRepositorio extends JpaRepository<Pais, Integer> {

    @Query("SELECT p FROM Pais p WHERE p.nombre LIKE '%' || ?1 || '%'")
    List<Pais> buscar(String nombre);
}
