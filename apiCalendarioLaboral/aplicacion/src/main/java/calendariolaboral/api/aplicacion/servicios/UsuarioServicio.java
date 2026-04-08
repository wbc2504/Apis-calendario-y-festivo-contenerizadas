package calendariolaboral.api.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import calendariolaboral.api.core.servicios.*;
import calendariolaboral.api.dominio.entidades.*;
import calendariolaboral.api.dominio.DTOs.*;
import calendariolaboral.api.infraestructura.repositorios.*;
import calendariolaboral.api.aplicacion.seguridad.*;

@Service
public class UsuarioServicio implements IUsuarioServicio {

    @Autowired
    private IUsuarioRepositorio repositorio;

    @Autowired
    private SeguridadServicio servicioSeguridad;

    @Override
    public UsuarioLoginDto login(String nombreUsuario, String clave) {
        Usuario usuarioObtenido = repositorio.validarUsuario(nombreUsuario, clave);
        UsuarioLoginDto userLoginResponseDto = new UsuarioLoginDto(usuarioObtenido);
        if (usuarioObtenido != null) {
            userLoginResponseDto.setToken(servicioSeguridad.generarToken(nombreUsuario));
        }
        return userLoginResponseDto;
    }

    @Override
    public List<Usuario> listar() {
        return repositorio.findAll();
    }

    @Override
    public Usuario obtener(Long id) {
        var usuario = repositorio.findById(id);
        return usuario.isEmpty() ? null : usuario.get();
    }

    @Override
    public List<Usuario> buscar(String nombre) {
        return repositorio.buscar(nombre);
    }

    public Usuario agregar(Usuario usuario) {
        usuario.setId(0);
        return repositorio.save(usuario);
    }

    @Override
    public Usuario modificar(Usuario usuario) {
        Optional<Usuario> usuarioEncontrado = repositorio.findById(usuario.getId());
        if (!usuarioEncontrado.isEmpty()) {
            return repositorio.save(usuario);
        } else {
            return null;
        }
    }

    @Override
    public boolean eliminar(Long id) {
        try {
            repositorio.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

}
