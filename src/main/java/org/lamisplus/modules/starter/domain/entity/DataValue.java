package org.lamisplus.modules.starter.domain.entity;

public class PrepWeekly {
    private String dataElement;
    private String categoryOptionCombo;
    private String attributeOptionCombo;
    private String facilityId;
    private String period;
    private int totalPrepCount;

    public String getDataElement() {
        return dataElement;
    }

    public void setDataElement(String dataElement) {
        this.dataElement = dataElement;
    }

    public String getCategoryOptionCombo() {
        return categoryOptionCombo;
    }

    public void setCategoryOptionCombo(String categoryOptionCombo) {
        this.categoryOptionCombo = categoryOptionCombo;
    }

    public String getAttributeOptionCombo() {
        return attributeOptionCombo;
    }

    public void setAttributeOptionCombo(String attributeOptionCombo) {
        this.attributeOptionCombo = attributeOptionCombo;
    }

    public String getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(String facilityId) {
        this.facilityId = facilityId;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public int getTotalPrepCount() {
        return totalPrepCount;
    }

    public void setTotalPrepCount(int totalPrepCount) {
        this.totalPrepCount = totalPrepCount;
    }
}
