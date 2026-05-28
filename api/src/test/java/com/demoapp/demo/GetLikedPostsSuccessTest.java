package com.demoapp.demo;

import com.demoapp.demo.controller.PostController;
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

@WebMvcTest(PostController.class)
public class GetLikedPostsSuccessTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Test
    void deveRetornarPostsCurtidosComSucesso() throws Exception {
        Map<String, Object> response = new HashMap<>();
        response.put("total", 1);

        when(postService.getLikedPosts(1L, 10, 0))
                .thenReturn(response);

        mockMvc.perform(get("/posts/liked")
                        .param("userId", "1")
                        .param("limit", "10")
                        .param("skip", "0"))
                .andExpect(status().isOk());
    }
}