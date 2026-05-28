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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
public class LikePostBugTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Test
void deveCurtirPostComSucesso() throws Exception {
    when(postService.toggleLike(3L, 1L))
            .thenThrow(new RuntimeException("Erro ao curtir post"));

    mockMvc.perform(post("/posts/3/like")
                    .param("userId", "1"))
            .andExpect(status().isOk());
}
}