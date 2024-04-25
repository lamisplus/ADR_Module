package org.lamisplus.modules.starter.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer-dhis2",
        description = "Installs the required dhis2 tables",
        version = 1)
public class Dhis2SchemaInstaller extends AcrossLiquibaseInstaller {
    public Dhis2SchemaInstaller() {
        super("classpath:installers/starter/dhis2Schema/dhis2-schema-1.xml");
    }
}
