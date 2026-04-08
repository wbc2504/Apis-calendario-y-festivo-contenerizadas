package calendariolaboral.api.core.servicios;

import java.time.LocalDate;
import java.util.List;

import calendariolaboral.api.dominio.DTOs.FestivoDto;
import calendariolaboral.api.dominio.entidades.Festivo;

public interface IFestivoServicio {

    List<Festivo> listar();

    Festivo obtener(int id);

    List<Festivo> buscar(String nombre);

    Festivo agregar(Festivo festivo);

    Festivo modificar(Festivo festivo);

    boolean eliminar(int id);

    boolean verificar(int idPais, LocalDate fecha);

    List<FestivoDto> listar(int idPais, int anio);
}
