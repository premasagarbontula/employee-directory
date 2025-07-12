package com.example.employeedirectory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {
        // Static data for filter dropdowns
        model.addAttribute("departments", List.of("HR", "IT", "Finance", "Marketing"));
        model.addAttribute("roles", List.of("Manager", "Developer", "Analyst", "Intern"));
        
        // Empty list to prevent template errors
        model.addAttribute("employees", List.of());
        
        return "index";
    }
}