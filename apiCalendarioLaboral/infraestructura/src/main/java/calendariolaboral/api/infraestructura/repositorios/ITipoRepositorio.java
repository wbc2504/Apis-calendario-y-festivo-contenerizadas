package calendariolaboral.api.infraestructura.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import calendariolaboral.api.dominio.entidades.Tipo;

@Repository
public interface ITipoRepositorio extends JpaRepository<Tipo, Integer> {

    @Query("SELECT t FROM Tipo t WHERE t.tipo LIKE %?1% ORDER BY t.tipo ASC")
    List<Tipo> buscar(String tipo);

}
