const yup = require("yup");

const interactionTypeEnum = ["Email", "Call", "Meeting"];

exports.updateInteractionsSchema = yup.object({
  interaction_type: yup
    .string()
    .required()
    .oneOf(
      interactionTypeEnum,
      "Email, Call and Meeting are the only options for interaction_type"
    ),
});
