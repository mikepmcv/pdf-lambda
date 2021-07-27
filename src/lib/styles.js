export default `
.pdf-visible { display: block; }
.pmcv-page-white-bg { padding-top: 0; border: none !important; }

.pmcv-box {
  border: none!important;
  padding: 0;
  margin-bottom: 20px;
}

.pmcv-header-container, 
.pmcv-footer-container,
div.relative-position,
.pmcv-admin-header,
.pmcv-service-header,
.pmcv-header,
#pmcv-global-nav,
.global-footer { display: none; }

.pmcv-font-section-heading { font-size: 18px !important; }
.pmcv-section-title h4 { display: none; }

.pmcv-notice,
#_hj_feedback_container { 
  display: none!important;
}

.form-group.formio-component {
  font-size: 12px;
  line-height: normal;
  margin-bottom: 15px;
  padding: 0;
}

#candidate-cv-eligibility .ant-radio-wrapper-checked {
  margin: 0;
}

#candidate-cv-referees .ant-row.mt-lg-2 {
  margin: 0;
}

.pmcv-candidate-referees .ant-table-tbody .ant-tag.pmcv-tag { padding: 0; }
.pmcv-candidate-referees .title-container span { font-size: 12px; }

.ant-descriptions { border: none; padding: 0; }
.ant-result-success { display: none; }
.ant-form-item * {
  line-height: normal;
}

.ant-form-item .ant-input.pmcv-input {
  color: #002268;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  padding: 0;
  height: unset !important;
  min-height: unset !important;
}

.ant-input[disabled] {
  border: none!important;
  background: none!important;
  padding: 0!important;
}

.ant-input::placeholder {
  opacity: 0;
}

label.pmcv-radio.ant-radio-wrapper { display: none; }
label.pmcv-radio.ant-radio-wrapper.ant-radio-wrapper-checked {
  display: flex;
}
label.pmcv-radio.ant-radio-wrapper .ant-radio + * {
  font-size: 12px;
  line-height: normal;
  padding: 0;
}
span.ant-radio.ant-radio-checked { display: none; }

.pmcv-note,
.pmcv-candidate-referees .ant-table-thead th:nth-child(n+3),
.pmcv-candidate-referees .ant-table-tbody td:nth-child(n+3),
.pmcv-candidate-referees .ant-table-body col:nth-last-child(-n+2), 
.formio-component-submit,
.formio-component-datagrid label:first-child,
.formio-component-name_title,
.formio-component-first_name,
.formio-component-last_name,
.formio-component-preferred_name,
.formio-component-residentialAddressManual,
.formio-component-gender,
.formio-component-dob,
.formio-component-phone_number,
.formio-component-file.formio-component-photo,
.formio-component-referee_submit, 
.formio-component-referee_declaration,
.glyphicon-question-sign,
.help-block {
  display: none;
}

.formio-component-photo { margin-bottom: 40px; }
.formio-component-fieldset { margin-top: 0; }
.formio-component-fieldset legend { font-size: 18px; }

.formio-component-content {
  color: #002268;
  font-size: 8px;
  font-weight: 400;
  margin-bottom: 15px;
  padding: 0;
}

.card-body .formio-component p, 
.formio-component-htmlelement { 
  color: #002268;
  font-size: 12px;
}

.form-group {
  -webkit-print-color-adjust: exact;
  font-size: 12px;
  line-height: normal;
  margin: 0;
  padding: 0;
}
.form-group .control-label {
  color: #002268;
  font-size: 12px;
  margin-bottom: 0;
}
.form-group .control-label.field-required::after { display: none; }

.form-group .choices__list { padding: 0; }
.form-group .choices__item { height: unset; }

.form-check.checkbox > label {
  display: block;
}
.form-check.radio {
  line-height: 3px;
  height: auto !important;
  margin: 0;
}
.form-check span,
.form-check.radio span {
  color: #002268;
  line-height: normal;
}

.form-group .checkbox label,
.form-group .radio label,
.form-group .form-check-label {
  padding-left: 0;
}

.form-check-input:not(:checked),
.form-check-input:not(:checked) + span, 
.referees-placeholder {
  display: none;
  height: 0;
}

.formio-component .form-check span,
label.control-label.form-check-label {
  color: #002268;
  font-size: 12px;
  margin-bottom: 0;
  padding: 0!important;
}

label.control-label.form-check-label {
  min-height: 0;
  padding-left: 0;
}

.list-group-item:first-child,
.list-group-item:last-child,
.table-bordered>tbody>tr>td,
.table-bordered>tbody>tr>th,
.table-bordered,
.table-bordered>tfoot>tr>td,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
  border: 0;
}

.formio-component-datagrid table.datagrid-table thead { color: #002268; font-size: 12px; }
.formio-component-datagrid table.datagrid-table tbody .pmcv-dg-readonly { color: #002268; margin: 0; }

.datagrid-table.table>tbody>tr>td,
.datagrid-table.table>tbody>tr>th,
.datagrid-table.table>tfoot>tr>td,
.datagrid-table.table>tfoot>tr>th,
.datagrid-table.table>thead>tr>td,
.datagrid-table.table>thead>tr>th {
  padding: 0 4px 4px 0;
}

.formio-component-textarea div.well {
  color: #002268;
  font-size: 12px;
  background: none;
  border: none;
  min-height: unset;
  margin: 0;
  padding: 0;
  box-shadow: none;
}

.table>caption+thead>tr:first-child>td,
.table>caption+thead>tr:first-child>th,
.table>colgroup+thead>tr:first-child>td,
.table>colgroup+thead>tr:first-child>th,
.table>thead:first-child>tr:first-child>td,
.table>thead:first-child>tr:first-child>th {
  border-top: none;
  min-width: 120px;
}
`;
