package org.lamisplus.modules.starter.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer-adr",
        description = "Installs the required adr tables",
        version = 11)
public class ADRSchemaInstaller extends AcrossLiquibaseInstaller {
    public ADRSchemaInstaller() {
        super("classpath:installers/starter/adrSchema/adr-schema-1.xml");
    }
}
