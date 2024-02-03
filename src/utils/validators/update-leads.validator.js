const yup = require("yup");

const leadStatusEnum = ["New", "Contacted", "Qualified", "Lost"];
const sourceEnum = ["Web", "Referral", "Partner"];

exports.updateLeadsSchema = yup
  .object({
    id: yup.number().required("id in param is required"),
    lead_name: yup.string().optional(),
    email: yup.string().optional(),
    lead_status: yup
      .string()
      .optional()
      .oneOf(
        leadStatusEnum,
        "New, Contacted, Qualified and Lost are the only options for lead_status"
      ),
    source: yup
      .string()
      .optional()
      .oneOf(
        sourceEnum,
        "Web, Referral and  Partner are the only options for sournce"
      ),
  })
  .test(
    "at-least-one-field",
    "At least one field (except lead_id) should be provided",
    (value) => {
      const fieldsToCheck = ["lead_name", "email", "lead_status", "source"];
      return fieldsToCheck.some((field) => !!value[field]);
    }
  );
