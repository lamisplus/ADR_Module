CREATE SEQUENCE  IF NOT EXISTS hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE dhis2_uploads (
  id BIGINT NOT NULL,
   filename VARCHAR(255),
   upload_date date,
   status VARCHAR(255),
   CONSTRAINT pk_dhis2_uploads PRIMARY KEY (id)
);