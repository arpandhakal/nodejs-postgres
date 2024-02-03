const yup = require("yup");

const leadStatusEnum = ["New", "Contacted", "Qualified", "Lost"];
const sourceEnum = ["Web", "Referral", "Partner"];

exports.findNumberofLeadsSchema = yup
  .object({
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
    "At least one field out of lead_status, source should be provided",
    (value) => {
      const fieldsToCheck = ["lead_status", "source"];
      return fieldsToCheck.some((field) => !!value[field]);
    }
  );
