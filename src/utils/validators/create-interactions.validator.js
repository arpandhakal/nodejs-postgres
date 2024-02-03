const yup = require("yup");

const interactionTypeEnum = ["Email", "Call", "Meeting"];

exports.createInteractionsSchema = yup.object({
  interaction_type: yup
    .string()
    .required("interaction_type is required")
    .oneOf(
      interactionTypeEnum,
      "Email, Cal and Meeting are the only options for lead_status"
    ),
  interaction_date: yup.date().required("interaction_date is required"),
});
