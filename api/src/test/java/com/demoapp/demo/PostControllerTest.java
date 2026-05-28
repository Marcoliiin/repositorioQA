package com.demoapp.demo;

import com.demoapp.demo.service.PostService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.demoapp.demo.controller.PostController;

@WebMvcTest(PostController.class)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Test
    void deveRetornarPostsComSucesso() throws Exception {

        Map<String, Object> response = new HashMap<>();
        response.put("total", 1);

        when(postService.getPosts(10, 0, null))
                .thenReturn(response);

        mockMvc.perform(get("/posts")
                        .param("limit", "10")
                        .param("skip", "0"))
                .andExpect(status().isOk());
    }
}