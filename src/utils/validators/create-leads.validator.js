const yup = require("yup");

const leadStatusEnum = ["New", "Contacted", "Qualified", "Lost"];
const sourceEnum = ["Web", "Referral", "Partner"];

exports.createLeadsSchema = yup.object({
  lead_name: yup.string().required("leadName is required"),
  email: yup.string().required("email is required"),
  lead_status: yup
    .string()
    .required("lead_status is required")
    .oneOf(
      leadStatusEnum,
      "New, Contacted, Qualified and Lost are the only options for lead_status"
    ),
  source: yup
    .string()
    .required("source is required")
    .oneOf(
      sourceEnum,
      "Web, Referral and  Partner are the only options for sournce"
    ),
});
