package calendariolaboral.api.aplicacion.servicios;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import calendariolaboral.api.core.servicios.IFestivoServicio;
import calendariolaboral.api.dominio.DTOs.ExpressLoginResponseDto;
import calendariolaboral.api.dominio.DTOs.FestivoDto;
import calendariolaboral.api.dominio.entidades.Festivo;
import calendariolaboral.api.infraestructura.repositorios.IFestivoRepositorio;

@Service
public class FestivoServicio implements IFestivoServicio {

    private final IFestivoRepositorio repositorio;
    private final RestClient restClient;

    @Value("${express.api.base-url:http://localhost:3000}")
    private String expressBaseUrl;

    @Value("${express.api.usuario:frayosorio}")
    private String expressUsuario;

    @Value("${express.api.clave:123}")
    private String expressClave;

    public FestivoServicio(IFestivoRepositorio repositorio, RestClient.Builder restClientBuilder) {
        this.repositorio = repositorio;
        this.restClient = restClientBuilder.build();
    }

    @Override
    public List<Festivo> listar() {
        return repositorio.findAll(Sort.by(Sort.Direction.ASC, "nombre"));
    }

    @Override
    public Festivo obtener(int id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    public List<Festivo> buscar(String nombre) {
        return repositorio.buscar(nombre);
    }

    @Override
    public Festivo agregar(Festivo festivo) {
        festivo.setId(0);
        return repositorio.save(festivo);
    }

    @Override
    public Festivo modificar(Festivo festivo) {
        if (repositorio.findById(festivo.getId()).isEmpty()) {
            return null;
        }
        return repositorio.save(festivo);
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

    @Override
    public boolean verificar(int idPais, LocalDate fecha) {
        return listar(idPais, fecha.getYear()).stream().anyMatch(festivo -> fecha.equals(festivo.getFecha()));
    }

    private String obtenerTokenExpress() {
        try {
            ExpressLoginResponseDto respuesta = restClient.get()
                    .uri(
                            expressBaseUrl + "/api/usuarios/validar/{usuario}/{clave}",
                            expressUsuario,
                            expressClave)
                    .retrieve()
                    .body(ExpressLoginResponseDto.class);

            if (respuesta == null || respuesta.getToken() == null || respuesta.getToken().isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "La API Express no devolvio un token valido");
            }

            return respuesta.getToken();
        } catch (RestClientException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "No fue posible autenticarse contra la API Express",
                    ex);
        }
    }

    @Override
    public List<FestivoDto> listar(int idPais, int anio) {
        String token = obtenerTokenExpress();

        try {
            FestivoDto[] respuesta = restClient.get()
                    .uri(expressBaseUrl + "/api/festivos/listar/{idPais}/{anio}", idPais, anio)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .retrieve()
                    .body(FestivoDto[].class);

            return respuesta == null ? List.of() : List.of(respuesta);
        } catch (RestClientException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "No fue posible consultar los festivos en la API Express",
                    ex);
        }
    }
}
