# ADR_Module
## Description
- The ADR module handles the management and tracking of Adverse Drug Reaction
  
## System Requirements

### Prerequisites to Install
- IDE of choice (IntelliJ, Eclipse, etc.)
- Java 8+
- node.js
- React.js
## Run in Development Environment

### How to Install Dependencies
1. Install Java 8+
2. Install PostgreSQL 14+
3. Install node.js
4. Install React.js
5. Open the project in your IDE of choice.

### Update Configuration File
1. Update other Maven application properties as required.

### Run Build and Install Commands
1. Change the directory to `src`:
    ```bash
    cd src
    ```
2. Run Frontend Build Command:
    ```bash
    npm run build
    ```
3. Run Maven clean install:
    ```bash
    mvn clean install
    ```

## How to Package for Production Environment
1. Run Maven package command:
    ```bash
    mvn clean package
    ```

## Launch Packaged JAR File
1. Launch the JAR file:
    ```bash
    java -jar <path-to-jar-file>
    ```
2. Optionally, run with memory allocation:
    ```bash
    java -jar -Xms4096M -Xmx6144M <path-to-jar-file>
    ```

## Visit the Application
- Visit the application on a browser at the configured port:
    ```
    http://localhost:8383
    ```

## Access Swagger Documentation
- Visit the application at:
    ```
    http://localhost:8383/swagger-ui.html#/
    ```

## Access Application Logs
- Application logs can be accessed in the `application-debug` folder.

## Authors & Acknowledgments
### Main contributors
- Victor Ajor   https://github.com/AJ-DataFI
- Mathew Adegbite https://github.com/mathewade
- Tyav Barnabas https://github.com/tyavbarnabas
## Special mentions.
