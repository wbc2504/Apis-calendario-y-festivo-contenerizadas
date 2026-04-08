package calendariolaboral.api.aplicacion.seguridad;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class FiltroSeguridad extends OncePerRequestFilter {
    private final String HEADER = "Authorization";
    private final String PREFIX = "Bearer ";

    @Autowired
    private SeguridadServicio servicioSeguridad;

    @Autowired
    private UsuarioDetalleServicio servicioUsuario;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String authHeader = request.getHeader(HEADER);
            String token = null;
            String nombreUsuario = null;
            if (authHeader != null && authHeader.startsWith(PREFIX)) {
                token = authHeader.substring(7);
                nombreUsuario = servicioSeguridad.extraerNombreUsuario(token);
            }
            if (nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = servicioUsuario.loadUserByUsername(nombreUsuario);
                if (servicioSeguridad.validarToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken autenticacionToken = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());
                    autenticacionToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(autenticacionToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (JwtException | UsernameNotFoundException e) {
            SecurityContextHolder.clearContext();
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"message\":\"" + escaparJson(e.getMessage()) + "\"}");
        }
    }

    private String escaparJson(String mensaje) {
        if (mensaje == null) {
            return "Token invalido o expirado";
        }
        return mensaje.replace("\\", "\\\\").replace("\"", "\\\"");
    }

}
