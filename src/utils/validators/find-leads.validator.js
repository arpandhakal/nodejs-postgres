const yup = require("yup");

exports.findLeadsSchema = yup.object({
  page: yup.number().required("page is required"),
  limit: yup.number().required("limit is required"),
  from: yup.date().optional(),
  to: yup.date().optional(),
});
