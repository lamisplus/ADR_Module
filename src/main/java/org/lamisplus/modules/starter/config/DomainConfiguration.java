package org.lamisplus.modules.starter.config;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.sql.DataSource;

@RequiredArgsConstructor
@EnableTransactionManagement
@Slf4j
@Configuration
@EnableJpaRepositories( transactionManagerRef = "adrTransactionManger",
        basePackages = {"org.lamisplus.modules.starter.repository"})
public class DomainConfiguration {
    private final DataSource dataSource;

    @PersistenceUnit
    private  final EntityManagerFactory entityManagerFactory;


    @Bean(name = "adrTransactionManger")
    @Primary
    public TransactionManager transactionManager(){
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
        jpaTransactionManager.setDataSource(dataSource);
        jpaTransactionManager.setEntityManagerFactory (entityManagerFactory);
        return jpaTransactionManager;
    }
}


