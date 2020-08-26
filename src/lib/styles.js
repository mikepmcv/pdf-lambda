export default `
.pdf-visible { display: block; }
.pmcv-notice { display: none; }
.ant-descriptions, 
._hj_feedback_container {
  border: none;
  padding: 0
}
.pdf-logo {
  width: 100px;
  margin-bottom: 40px;
}
.ant-result-success {
  display: none;
}
label.pmcv-radio.ant-radio-wrapper {
  display: none;
}
label.pmcv-radio.ant-radio-wrapper.ant-radio-wrapper-checked {
  display: flex;
}
span.ant-radio.ant-radio-checked {
  display: none;
}
.formio-component-referee_submit, .formio-component-referee_declaration { display: none;}
.formio-component-photo {margin-bottom: 40px;}
.ant-result-success { display: none }
.pmcv-header-container, .pmcv-footer-container { display: none; }
.form-group {
  -webkit-print-color-adjust: exact;
  margin-bottom: 5px;
}
.ant-input[disabled] {
  border: 0!important;
  background: none!important;
  padding: 0!important;
}
.help-block { display: none!important; }
.pmcv-box, .pmcv-page-white-bg {
  border: 0!important;
}
.table>caption+thead>tr:first-child>td,
.table>caption+thead>tr:first-child>th,
.table>colgroup+thead>tr:first-child>td,
.table>colgroup+thead>tr:first-child>th,
.table>thead:first-child>tr:first-child>td,
.table>thead:first-child>tr:first-child>th {
  border-top: 0;
  min-width: 120px;
}
.choices__list {
    padding: 0!important;
}
.glyphicon-question-sign, .field-required:after { display: none!important;}
.formio-component-textarea .well {
border: 0;
background: none;
padding: 10px 0;
}
.form-check-input[disabled] {
display: none;
padding: 0;
margin: 0;
height: 0;
}
.form-check-input:not(:checked) + span, .referees-placeholder {
display: none;
height: 0;
}
.form-check-input + span,
label.control-label.form-check-label {
padding: 0!important;
height: 0!important;
}
.form-check.radio {
height: auto!important;
line-height: 3px;
}
label.control-label.form-check-label {
min-height: 0;
}
.list-group-item:first-child, .list-group-item:last-child, .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
border: 0;
}
`;