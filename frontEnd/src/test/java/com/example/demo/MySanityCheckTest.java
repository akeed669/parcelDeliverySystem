/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.example.demo;
import com.example.demo.web.ClientController;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

//To test that the context is creating a controller, an assertion is added.
//The controller is injected before the test methods are run.
//AssertJ is used to express the test assertions.

public class MySanityCheckTest {    
        @Autowired
	private ClientController controller;
    
	@Test
	public void contextLoads() throws Exception {
            assertThat(controller).isNotNull();
	}
}
