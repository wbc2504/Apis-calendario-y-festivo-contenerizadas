package calendariolaboral.api.dominio.DTOs;

public class ExpressLoginResponseDto {

    private Object usuario;
    private String token;

    public ExpressLoginResponseDto() {
    }

    public Object getUsuario() {
        return usuario;
    }

    public void setUsuario(Object usuario) {
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
