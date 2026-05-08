package net.engineeringdigest.journalApp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class RootController {

    @GetMapping("/")
    public void redirectToHealthCheck(HttpServletResponse response) throws IOException {
        response.sendRedirect("/journal/public/Health-check");
    }
}
