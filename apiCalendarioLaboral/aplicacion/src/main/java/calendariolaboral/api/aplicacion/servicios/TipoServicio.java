package calendariolaboral.api.aplicacion.servicios;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import calendariolaboral.api.core.servicios.ITipoServicio;
import calendariolaboral.api.dominio.entidades.Tipo;
import calendariolaboral.api.infraestructura.repositorios.ITipoRepositorio;

@Service
public class TipoServicio implements ITipoServicio {

    private final ITipoRepositorio repositorio;

    public TipoServicio(ITipoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public List<Tipo> listar() {
        return repositorio.findAll(Sort.by(Sort.Direction.ASC, "tipo"));
    }

    @Override
    public Tipo obtener(int id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    public List<Tipo> buscar(String tipo) {
        return repositorio.buscar(tipo);
    }

    @Override
    public Tipo agregar(Tipo tipo) {
        tipo.setId(0);
        return repositorio.save(tipo);
    }

    @Override
    public Tipo modificar(Tipo tipo) {
        if (repositorio.findById(tipo.getId()).isEmpty()) return null;
        return repositorio.save(tipo);
    }

    @Override
    public boolean eliminar(int id) {
        try {
            repositorio.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
