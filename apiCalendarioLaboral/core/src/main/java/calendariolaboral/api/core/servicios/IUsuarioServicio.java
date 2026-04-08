package calendariolaboral.api.core.servicios;

import java.util.List;
import calendariolaboral.api.dominio.entidades.*;
import calendariolaboral.api.dominio.DTOs.*;

public interface IUsuarioServicio {

    public UsuarioLoginDto login(String nombreUsuario, String clave);

    public List<Usuario> listar();

    public Usuario obtener(Long id);

    public List<Usuario> buscar(String nombre);

    public Usuario agregar(Usuario Usuario);

    public Usuario modificar(Usuario Usuario);

    public boolean eliminar(Long id);
}
