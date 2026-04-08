package calendariolaboral.api.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import calendariolaboral.api.dominio.entidades.*;
import calendariolaboral.api.core.servicios.*;
import calendariolaboral.api.infraestructura.repositorios.*;

@Service
public class PaisServicio implements IPaisServicio {

    @Autowired
    private IPaisRepositorio repositorio;


    @Override
    public List<Pais> listar() {
        return repositorio.findAll();
    }

    @Override
    public Pais obtener(int id) {
        var pais = repositorio.findById(id);
        return pais.isEmpty() ? null : pais.get();
    }

    @Override
    public List<Pais> buscar(String nombre) {
        return repositorio.buscar(nombre);
    }

    @Override
    public Pais agregar(Pais pais) {
        pais.setId(0);
        return repositorio.save(pais);
    }

    @Override
    public Pais modificar(Pais pais) {
        Optional<Pais> paisEncontrado = repositorio.findById(pais.getId());
        if (!paisEncontrado.isEmpty()) {
            return repositorio.save(pais);
        } else {
            return null;
        }
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
