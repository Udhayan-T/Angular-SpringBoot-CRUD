package com.stackroute.keepnote.aspectj;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */
@Aspect
@Component
public class LoggingAspect {
	Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	/*
	 * Write loggers for each of the methods of controller, any particular method
	 * will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */

    
    @Before("execution(* com.stackroute.keepnote.controller.*.*(..))")
    public void beforeListAllUsers(JoinPoint joinPoint) {
        logger.info("-----------------@Before----------------");
        logger.debug("Method Name:"+joinPoint.getSignature().getName());
        logger.info("---------------------------------");
    }
    
    @After("execution(* com.stackroute.keepnote.controller.*.*(..))")
    public void afterListAllUsers(JoinPoint joinPoint) {
        logger.info("-----------------@After----------------");
        logger.debug("Method Name:"+joinPoint.getSignature().getName());
        logger.debug("Method Args:"+Arrays.toString(joinPoint.getArgs()));
        logger.info("---------------------------------");
    }
    
    @AfterReturning(pointcut="execution(* com.stackroute.keepnote.controller.*.*(..)))", returning = "result")
    public void afterReturningListAllUsers(JoinPoint joinPoint, Object result) {
        logger.info("-----------------@AfterReturning----------------");
        logger.debug("Method Name:"+joinPoint.getSignature().getName());
        logger.debug("Method Args:"+Arrays.toString(joinPoint.getArgs()));
        logger.debug("Method ReturnValue:"+result);
        logger.info("---------------------------------");
    }
    
    @AfterThrowing(pointcut="execution(* com.stackroute.keepnote.controller.*.*(..)))", throwing = "exception")
    public void afterReturningListAllUsers(JoinPoint joinPoint, Throwable exception) {
        logger.info("-----------------@AfterReturning----------------");
        logger.debug("Method Name:"+joinPoint.getSignature().getName());
        logger.debug("Method Args:"+Arrays.toString(joinPoint.getArgs()));
        logger.debug("Method Exception:"+exception);
        logger.info("---------------------------------");
    }
}
