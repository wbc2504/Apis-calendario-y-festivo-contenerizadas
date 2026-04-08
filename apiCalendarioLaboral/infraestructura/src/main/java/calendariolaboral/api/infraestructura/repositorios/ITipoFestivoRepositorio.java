package calendariolaboral.api.infraestructura.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import calendariolaboral.api.dominio.entidades.TipoFestivo;

@Repository
public interface ITipoFestivoRepositorio extends JpaRepository<TipoFestivo, Integer> {

    @Query("SELECT t FROM TipoFestivo t WHERE t.tipo LIKE %?1% ORDER BY t.tipo ASC")
    List<TipoFestivo> buscar(String tipo);

}
