import { withNumber } from "hoc";
import { FormField } from "components/shared/form/form-field";

type NumberFieldProps = {
  onChange: OnFilterChange;
};

const FormNumberField = withNumber<NumberFieldProps>(FormField);

export { FormNumberField };
